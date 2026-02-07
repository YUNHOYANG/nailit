import { createClient } from "@/lib/supabase/server"
import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"
import { SYSTEM_PROMPT } from "@/lib/prompts/system-prompt"

export async function POST(request: Request) {
    try {
        const { prompt, images } = await request.json()

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
        }

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Initialize Gemini Nano Banana Pro
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        })

        // Prepend system prompt to user input for context
        const enhancedPrompt = `${SYSTEM_PROMPT}\n\nUSER REQUEST: ${prompt}`;
        let contents: any[] = [{ text: enhancedPrompt }]

        // Process multiple reference images
        if (images && Array.isArray(images)) {
            for (const img of images) {
                let base64Data: string;
                let mimeType: string;

                if (img.startsWith('data:')) {
                    // Handle base64 from file upload
                    base64Data = img.split(",")[1]
                    mimeType = img.split(",")[0].split(":")[1].split(";")[0]
                } else {
                    // Handle URL from Reference Gallery
                    try {
                        const imgResponse = await fetch(img);
                        const arrayBuffer = await imgResponse.arrayBuffer();
                        base64Data = Buffer.from(arrayBuffer).toString('base64');
                        mimeType = imgResponse.headers.get('content-type') || 'image/png';
                    } catch (fetchError) {
                        console.error("Failed to fetch reference image:", img);
                        continue; // Skip failed images
                    }
                }

                contents.push({
                    inlineData: {
                        mimeType,
                        data: base64Data,
                    },
                })
            }
        }

        const response = await ai.models.generateContent({
            model: "gemini-3-pro-image-preview",
            contents: contents,
            config: {
                responseModalities: ["TEXT", "IMAGE"],
            }
        })

        if (!response.candidates || response.candidates.length === 0) {
            return NextResponse.json({ error: "No candidates returned from AI" }, { status: 500 })
        }

        let imageData: string | null = null
        let responseText: string = ""

        // Extract image and text from candidates
        const content = response.candidates[0].content
        if (content && content.parts) {
            for (const part of content.parts) {
                if ("text" in part && part.text) {
                    responseText += part.text
                } else if ("inlineData" in part && part.inlineData) {
                    imageData = part.inlineData.data || null
                }
            }
        }

        if (!imageData) {
            return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
        }

        // Convert base64 to buffer
        const buffer = Buffer.from(imageData, "base64")
        const thumbnailId = crypto.randomUUID()
        const filePath = `${user.id}/${thumbnailId}.png`

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from("thumbnails")
            .upload(filePath, buffer, {
                contentType: "image/png",
                upsert: true,
            })

        if (uploadError) {
            console.error("Upload error:", uploadError)
            return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from("thumbnails")
            .getPublicUrl(filePath)

        // Save to Database
        const { error: dbError } = await supabase
            .from("thumbnails")
            .insert({
                id: thumbnailId,
                user_id: user.id,
                prompt: prompt,
                image_url: publicUrl,
            })

        if (dbError) {
            console.error("DB error:", dbError)
        }

        return NextResponse.json({
            id: thumbnailId,
            image_url: publicUrl,
            prompt: prompt,
            created_at: new Date().toISOString()
        })

    } catch (error: any) {
        console.error("Generation error:", error)
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
    }
}

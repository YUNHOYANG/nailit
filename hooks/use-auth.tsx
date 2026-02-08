"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

interface AuthContextType {
    user: User | null
    credits: number
    plan: string
    subscriptionStatus: string
    hasPolarId: boolean
    loading: boolean
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const supabase = createClient()
    const [user, setUser] = useState<User | null>(null)
    const [credits, setCredits] = useState(0)
    const [plan, setPlan] = useState("free")
    const [subscriptionStatus, setSubscriptionStatus] = useState("inactive")
    const [hasPolarId, setHasPolarId] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchUserData = async (userId: string) => {
        const { data, error } = await supabase
            .from('users')
            .select('credits, plan, subscription_status, polar_customer_id')
            .eq('id', userId)
            .single()

        if (data && !error) {
            setCredits(data.credits)
            setPlan(data.plan || "free")
            setSubscriptionStatus(data.subscription_status || "inactive")
            setHasPolarId(!!data.polar_customer_id)
        }
    }

    useEffect(() => {
        let mounted = true;

        const checkUser = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession()
                if (error) throw error;

                if (mounted) {
                    const currentUser = session?.user ?? null
                    setUser(currentUser)
                    if (currentUser) {
                        fetchUserData(currentUser.id) // Non-blocking
                    }
                }
            } catch (err) {
                console.error("Error checking auth session:", err)
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!mounted) return;

            const currentUser = session?.user ?? null
            setUser(currentUser)

            if (currentUser) {
                fetchUserData(currentUser.id) // Non-blocking
            } else {
                setCredits(0)
                setPlan("free")
                setSubscriptionStatus("inactive")
                setHasPolarId(false)
            }
            setLoading(false)
        })

        return () => {
            mounted = false;
            subscription.unsubscribe()
        }
    }, [])

    // separate effect for real-time credits to avoid complexity in auth effect
    useEffect(() => {
        if (!user) return;

        const channel = supabase
            .channel(`public:users:id=eq.${user.id}`)
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'users',
                filter: `id=eq.${user.id}`
            }, (payload) => {
                const updated = payload.new as any
                if (updated) {
                    if (typeof updated.credits === 'number') setCredits(updated.credits)
                    if (updated.plan) setPlan(updated.plan)
                    if (updated.subscription_status) setSubscriptionStatus(updated.subscription_status)
                    if (updated.polar_customer_id) setHasPolarId(true)
                }
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user?.id])

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'select_account',
                },
            },
        })
        if (error) throw error
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    return (
        <AuthContext.Provider value={{ user, credits, plan, subscriptionStatus, hasPolarId, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

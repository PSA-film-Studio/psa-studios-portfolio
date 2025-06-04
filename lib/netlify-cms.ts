// This file will handle the integration with Netlify CMS/Identity

import { NetlifyIdentityWidget } from "netlify-identity-widget"

// Initialize Netlify Identity
export const initNetlifyIdentity = () => {
  if (typeof window !== "undefined" && !window.netlifyIdentity) {
    window.netlifyIdentity = NetlifyIdentityWidget
    window.netlifyIdentity.init()
  }
}

// Handle login
export const login = () => {
  if (typeof window !== "undefined") {
    window.netlifyIdentity.open("login")
  }
}

// Handle logout
export const logout = () => {
  if (typeof window !== "undefined") {
    window.netlifyIdentity.logout()
  }
}

// Get current user
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    return window.netlifyIdentity.currentUser()
  }
  return null
}

// Check if user is logged in
export const isLoggedIn = () => {
  const user = getCurrentUser()
  return !!user
}

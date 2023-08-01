"use client";

import React from "react";

import { SessionProvider, type SessionProviderProps } from "next-auth/react";

const Provider = ({ children, session }: SessionProviderProps) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;

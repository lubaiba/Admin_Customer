'use client'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react'

export default function AppThemeProvider(
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) {
    const theme=createTheme({
        palette:{
            primary:{
                main:'#b71c1c',
                dark:'#EF5350',
                light:'#757ce8'
            },
            secondary:{
                main:'#004d40'
            }
        }
    }
    )

  return (
    <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
  )
}

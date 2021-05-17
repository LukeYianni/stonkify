import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import theme from './theme'

import SavingsInterestPage from './components/SavingsInterestPage'
import './App.css'

const defaultTheme = extendTheme(theme);

//Almost all functionality has been moved to the SavingsInterestPage, since the App might not always be just this component
function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <SavingsInterestPage />
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App

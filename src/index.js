import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";

import store from './store/store';
import customTheme from "./styles/theme";

import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <BrowserRouter>
                <ChakraProvider theme={customTheme}>
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>,
    document.getElementById('root')
);
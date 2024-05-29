import { Fragment, type ReactElement, type ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from '@/utils/Snackbar'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(<Fragment>
        <SnackbarProvider maxSnack={3}>
            <SnackbarUtilsConfigurator />
            <Component {...pageProps} />
        </SnackbarProvider>

    </Fragment>)
}
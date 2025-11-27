import { clerkMiddleware } from '@clerk/nuxt/server'

export default clerkMiddleware((event) => {
    console.log(event.context)
    console.log(event.path)

    const { has } = event.context.auth()
    const isInvoicesRoute = event.path.startsWith('/api/invoices')
    const canCreateInvoices = has({
        permission: 'org:invoices:create',
    })

    // Check if user is accessing sensitive customer data
    if (isInvoicesRoute) {
        // Check if user has the required permission
        if (!canCreateInvoices) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Unauthorized: Missing permission to create invoices',
            })
        }
    }
})
const getBaseUrl = () => {
    const config = useRuntimeConfig();
    return config.public.BILLING_MICROSERVICE_API + "/payment_methods";
};
export const getPaymentMethods = async () => {
    try {

        const url = getBaseUrl();
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching payment methods: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Payment Method Service error:', error);
        throw error;
    }
};
<template>
    <div>
        <h1 class="text-xl">Metodos de pago</h1>
        <div>
            <p>Lista de metodos de pago</p>
            <ul class="list-disc pl-5">
                <li v-for="(method, index) in paymentMethods" :key="index">
                    {{ method.name }} - {{ method.type }}
                </li>
            </ul>
        </div>

    </div>
</template>
<script setup>
import { getPaymentMethods } from '~/service/PaymentMethodService';
const paymentMethods = ref([]);

const fetchPaymentMethods = async () => {

    try {
        // Llamar a la API con los parámetros de filtro
        const data = await getPaymentMethods();
        console.log('Data:', data);
        paymentMethods.value = data;
    } catch (err) {
        console.error('Error fetching transactions:', err);
        error.value = 'No se pudieron cargar las transacciones. Por favor, intenta de nuevo más tarde.';
    } finally {
    }
};
onMounted(() => {
    fetchPaymentMethods();
});
</script>
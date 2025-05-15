<template>
    <div>
        <h1 class="text-xl mb-4">Transacciones</h1>

        <!-- Sección de filtros separada -->
        <div class="card mb-4 p-4">
            <h2 class="text-lg mb-3">Filtros</h2>
            
            <div class="flex flex-wrap gap-4">
                <!-- Filtro de Estado -->
                <div class="flex flex-col">
                    <label for="status-filter" class="mb-2">Estado</label>
                    <Select 
                        id="status-filter"
                        v-model="filters.status.value" 
                        :options="statuses"
                        placeholder="Seleccione estado" 
                        style="min-width: 12rem" 
                        :showClear="true"
                        @change="applyFilters"
                    >
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </div>
                
                <!-- Filtro de Método de Pago -->
                <div class="flex flex-col">
                    <label for="payment-method-filter" class="mb-2">Método de Pago</label>
                    <Select
                        id="payment-method-filter"
                        v-model="filters.paymentMethodId.value"
                        :options="paymentMethods"
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Seleccione método"
                        style="min-width: 12rem"
                        :showClear="true"
                        @change="applyFilters"
                    />
                </div>
                
                <!-- Filtro de Fecha (Rango) -->
                <div class="flex flex-col">
                    <label for="date-filter" class="mb-2">Rango de Fechas</label>
                    <Calendar
                        id="date-filter"
                        v-model="dateRange"
                        selectionMode="range"
                        dateFormat="dd/mm/yy"
                        placeholder="Seleccione fechas"
                        style="min-width: 20rem"
                        :showClear="true"
                        @date-select="applyFilters"
                    />
                </div>
            </div>
            
            <!-- Botones de acción para filtros -->
            <div class="flex gap-2 mt-4">
                <Button label="Limpiar Filtros" icon="pi pi-times" outlined @click="clearFilters" />
            </div>
        </div>

        <!-- DataTable sin filtros internos -->
        <div class="card p-4">
            <DataTable 
                :value="transactions" 
                :paginator="true" 
                :rows="10" 
                tableStyle="min-width: 50rem"
                :loading="loading"
                :filters="filters"
                v-model:filters="filters"
                filterDisplay="menu"
                :globalFilterFields="['id', 'orderId', 'status', 'total', 'paymentMethodId', 'channelId']"
            >
                <Column field="id" header="Id"></Column>
                <Column field="date" header="Fecha"></Column>
                <Column field="orderId" header="Orden N°"></Column>
                <Column field="status" header="Estado">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)" />
                    </template>
                </Column>
                <Column field="total" header="Total">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.total) }}
                    </template>
                </Column>
                <Column field="paymentMethodId" header="Método de Pago"></Column>
                <Column field="totalServicesFee" header="Tarifas con IVA">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.totalServicesFee) }}
                    </template>
                </Column>
                <Column field="channelId" header="Canal"></Column>
                <Column header="Acciones">
                    <template #body="slotProps">
                        <div class="flex gap-2">
                            <Button icon="pi pi-eye" text rounded @click="viewTransaction(slotProps.data)" />
                            <Button icon="pi pi-pencil" text rounded @click="editTransaction(slotProps.data)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getTransactions } from '~/service/TransactionService';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

// Estado para la carga de datos
const transactions = ref([]);
const loading = ref(false);
const error = ref(null);

// Configuración de filtros
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    paymentMethodId: { value: null, matchMode: FilterMatchMode.EQUALS },
    date: { 
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
    }
});

// Opciones para select de estados
const statuses = ref(['pendiente', 'aprobado', 'rechazado', 'anulado']);

// Opciones para métodos de pago (ejemplo)
const paymentMethods = ref([
    { id: 1, name: 'Tarjeta de Crédito' },
    { id: 2, name: 'Transferencia Bancaria' },
    { id: 3, name: 'PayPal' },
    { id: 4, name: 'Débito' }
]);

// Estado para filtro de rango de fechas
const dateRange = ref(null);

// Función para obtener los datos con filtros
const fetchTransactions = async () => {
    loading.value = true;
    error.value = null;
    
    try {
        // Preparar parámetros para la API
        const params = {};
        
        // Añadir filtros si están definidos
        if (filters.value.status.value) {
            params.status = filters.value.status.value;
        }
        
        if (filters.value.paymentMethodId.value) {
            params.paymentMethodId = filters.value.paymentMethodId.value;
        }
        
        // Manejar filtro de fechas si se ha seleccionado un rango
        if (dateRange.value && dateRange.value[0] && dateRange.value[1]) {
            params.startDate = formatDateForApi(dateRange.value[0]);
            params.endDate = formatDateForApi(dateRange.value[1]);
        }
        
        // Llamar a la API con los parámetros de filtro
        const data = await getTransactions(params);
        
        transactions.value = data;
    } catch (err) {
        console.error('Error fetching transactions:', err);
        error.value = 'No se pudieron cargar las transacciones. Por favor, intenta de nuevo más tarde.';
    } finally {
        loading.value = false;
    }
};

// Aplicar filtros
const applyFilters = () => {
    fetchTransactions();
};

// Limpiar todos los filtros
const clearFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        paymentMethodId: { value: null, matchMode: FilterMatchMode.EQUALS },
        date: { 
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
        }
    };
    dateRange.value = null;
    fetchTransactions();
};

// Función auxiliar para formatear fecha para la API
const formatDateForApi = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Función para formatear moneda
const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(value);
};

// Determinar el color del tag según el estado
const getSeverity = (status) => {
    switch (status) {
        case 'pendiente':
            return 'warn';
        case 'aprobado':
            return 'success';
        case 'rechazado':
            return 'danger';
        case 'anulado':
            return 'info';
        default:
            return null;
    }
};

// Funciones para acciones
const viewTransaction = (transaction) => {
    // Implementa la lógica para ver detalles
    console.log('Ver transacción:', transaction);
    // Podrías navegar a una página de detalles o abrir un modal
};

const editTransaction = (transaction) => {
    // Implementa la lógica para editar
    console.log('Editar transacción:', transaction);
    // Podrías navegar a una página de edición o abrir un modal
};

// Cargar datos al montar el componente
onMounted(() => {
    fetchTransactions();
});
</script>

<style scoped>
.card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
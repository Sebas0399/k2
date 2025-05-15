<template>
    <div>
        <header>
            <Menubar :model="items">
                <template #start>
                    <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg"
                        class="h-8">
                        <path d="..." fill="var(--p-primary-color)" />
                        <path d="..." fill="var(--p-text-color)" />
                    </svg>
                </template>
                <template #item="{ item, props, hasSubmenu, root }">
                    <NuxtLink v-if="item.to" :to="item.to" v-ripple class="flex items-center" custom
                        v-slot="{ href, navigate }">
                        <a :href="href" @click="navigate" class="flex items-center" v-bind="props.action">
                            <span>{{ item.label }}</span>
                            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                            <span v-if="item.shortcut"
                                class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                                    item.shortcut }}</span>
                            <i v-if="hasSubmenu"
                                :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                        </a>
                    </NuxtLink>
                    <a v-else v-ripple class="flex items-center" v-bind="props.action">
                        <span>{{ item.label }}</span>
                        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                        <span v-if="item.shortcut"
                            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                                item.shortcut }}</span>
                        <i v-if="hasSubmenu"
                            :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                    </a>
                </template>
                <template #end>
                    <!-- <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true"
                        aria-controls="overlay_menu" /> -->
                    <Avatar label="P" class="mr-2" size="xlarge" @click="toggle" shape="circle"/>

                    <Menu ref="menu" id="overlay_menu" :model="userMenuItems" :popup="true" />
                </template>
            </Menubar>
        </header>
    </div>
</template>

<script setup>
const menu = ref();

const items = ref([
    {
        label: 'Home',
        to: '/'
    },
    {
        label: 'Posts',
        to: '/posts'
    },
    {
        label: 'Ventas',
        items: [
            {
                label: 'Transacciones',
                to: '/transactions'
            },
            {
                label: 'Ajustes de Pago',
                items: [
                    {
                        label: 'Metodos de Pago',
                        to: '/payment/methods'
                    },

                ]
            }

        ]
    },
    // Add other menu items as needed

]);
const userMenuItems = ref([
    {
        label: 'Perfil',
        icon: 'pi pi-user',
        to: '/profile'
    },
    {
        label: 'Configuración',
        icon: 'pi pi-cog',
        to: '/settings'
    },
    {
        separator: true
    },
    {
        label: 'Ayuda',
        icon: 'pi pi-question-circle',
        url: 'https://docs.example.com'
    },
    {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => logout()
    }
]);
const showUserMenu = (event) => {
    userMenu.value.toggle(event);
};

// Función para cerrar sesión
const logout = () => {
    // Implementar lógica de cierre de sesión
    console.log('Cerrando sesión...');
    // Ejemplo: redirección a página de login
    // navigateTo('/login');
};
const toggle = (event) => {
    menu.value.toggle(event);
};
</script>
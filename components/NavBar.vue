<template>
    <div>
        <header>
            <SignedIn>
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
                                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }"
                                    :value="item.badge" />
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

                        <SignedOut>
                            <SignInButton mode="modal" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton>
                                <UserButton.UserProfilePage label="Whatsapp Business" url="custom">
                                    <template #labelIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                            fill="currentColor">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"></path>
                                        </svg>
                                    </template>
                                    <div>

                                        <h1>Whatsapp Business</h1>
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <label for="webhookUrl">Webhook URL</label>
                                        <InputText name="webhookUrl" id="webhookUrl" type="text"
                                            placeholder="Webhook URL" fluid disabled />
                                    </div>
                                    <div class="flex flex-col gap-1">
                                        <label for="plainToken">Token de verificación</label>

                                        <InputText name="plainToken" id="plainToken" type="text"
                                            placeholder="Token de verificación" fluid disabled />
                                    </div>
                                    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit"
                                        class="flex flex-col gap-4 w-full mt-4">

                                        <div class="flex flex-col gap-1">
                                            <InputText name="token" type="text" placeholder="Token de acceso permanente"
                                                fluid />
                                            <Message v-if="$form.token?.invalid" severity="error" size="small"
                                                variant="simple">{{
                                                    $form.token.error?.message }}</Message>
                                        </div>
                                        <div class="flex flex-col gap-1">
                                            <InputText name="phoneId" type="text" placeholder="ID de número de teléfono"
                                                fluid />
                                            <Message v-if="$form.phoneId?.invalid" severity="error" size="small"
                                                variant="simple">{{
                                                    $form.phoneId.error?.message }}</Message>
                                        </div>
                                        <div class="flex flex-col gap-1">
                                            <InputText name="whatsappBusinessId" type="text"
                                                placeholder="ID de la cuenta de WhatsApp Business" fluid />
                                            <Message v-if="$form.whatsappBusinessId?.invalid" severity="error"
                                                size="small" variant="simple">{{
                                                    $form.whatsappBusinessId.error?.message }}</Message>
                                        </div>
                                        <div class="flex flex-col gap-1">
                                            <InputText name="whatsappAppId" type="text"
                                                placeholder="ID de la Aplicación" fluid />
                                            <Message v-if="$form.whatsappAppId?.invalid" severity="error" size="small"
                                                variant="simple">{{
                                                    $form.whatsappAppId.error?.message }}</Message>
                                        </div>
                                        <Button type="submit" severity="secondary" label="Guardar" />
                                    </Form>
                                </UserButton.UserProfilePage>
                            </UserButton>
                        </SignedIn>
                    </template>
                </Menubar>
            </SignedIn>
            <SignedOut>
                <Menubar :model="itemsSign">
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
                                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }"
                                    :value="item.badge" />
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
                        <SignedOut>
                            <SignInButton mode="modal" />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </template>

                </Menubar>
            </SignedOut>
        </header>
    </div>
</template>

<script setup>
import { UserButton } from '@clerk/vue'
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useUser } from '@clerk/vue'
const { isSignedIn, user, isLoaded } = useUser()

const toast = useToast();

const initialValues = ref({
    token: '',
    phoneId: '',
    whatsappBusinessId: '',
    whatsappAppId: ''
});
const resolver = ref(zodResolver(
    z.object({
        token: z.string().min(1, { message: 'Token is required via Zod.' }),
        phoneId: z.string().min(1, { message: 'Phone ID is required via Zod.' }),
        whatsappBusinessId: z.string().min(1, { message: 'WhatsApp Business ID is required via Zod.' }),
        whatsappAppId: z.string().min(1, { message: 'WhatsApp App ID is required via Zod.' })
    })
));
onMounted(() => {
    // Initialize the form or perform any setup needed
    useFetch('configs/{}/company').then((response) => {
        initialValues.value.webhookUrl = response.data.webhookUrl;
    });
    if (isLoaded.value && user.value) {
        console.log(user.value.id);
    } else {
        // If not loaded yet, watch for changes
        watch(isLoaded, (newIsLoaded) => {
            if (newIsLoaded && user.value) {
                console.log(user.value.id);
                useFetch('http://localhost:8080/configs/company/'+user.value.id).then((response) => {
                    console.log(response.data);
                    initialValues.value.webhookUrl = response.data.webhookUrl;
                });
            }
        });
    }
});
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
const itemsSign = ref([
    {
        label: 'Home',
        to: '/'
    },
    // Add other menu items as needed

]);

</script>
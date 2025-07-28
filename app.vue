<style src="@/assets/css/global_defs.css"></style>
<template>
    <div class="main-container">
        <NavBar />
        <div class="page-content">
            <div class="page-loading-container" v-if="pageLoading">
                <LoadingIndicator :size="50" />
            </div>
            <NuxtPage v-if="$route.path.includes('admin') ? userIsAdmin : true" />
        </div>
        <Footer />
    </div>
</template>

<style>
body {
    color: var(--color-text-primary);
    margin: 0;
    background-color: var(--color-counter-primary);
    font-family: var(--font-stack);
}

.main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.page-content {
    flex: 1;
    background: radial-gradient(var(--color-counter-primary) 10%, var(--color-primary));
    position: relative;
}

.page-loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    z-index: 999;
}

.highlight {
    color: var(--color-highlight);
}

::selection {
    background: var(--color-highlight);
    color: var(--color-primary);
    text-shadow: none;
}

::-moz-selection {
    background: var(--color-highlight);
    color: var(--color-primary);
    text-shadow: none;
}
</style>

<script setup>
import NavBar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
import LoadingIndicator from './components/loading_indicator.vue'

const pageLoading = ref(true)

const auth = useAuth()
onMounted(async () => {
    await auth.getUser()
})

const { userIsAdmin, authReady } = auth

const router = useRouter()

watch(
    [userIsAdmin, authReady],
    ([isAdmin, authReady]) => {
        if (authReady) {
            pageLoading.value = false
            if (!isAdmin && router.currentRoute.value.path.includes('admin')) {
                showError({
                    statusCode: 401,
                    cause: 'Unauthorized'
                })
            }
        }
    },
    { immediate: true }
)

</script>

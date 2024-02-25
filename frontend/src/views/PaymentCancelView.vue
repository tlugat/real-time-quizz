<script setup>
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// import { useUpdateInventoryMutation} from 'queries/inventory/useUpdateInventoryMutation';

const router = useRouter()

const route = useRoute();
const sessionId = route.fullPath.match(/[^/]+$/)[0];
// const updateInventory = useUpdateInventoryMutation();
watchEffect( () => {
    if(!sessionId) return
    router.replace({name :'shop'});
})

</script>
<template>
    <div class="payment-cancel">
        <h1 class="title">Payment Cancel</h1>
    </div>
</template>
<style scoped>
        .payment-cancel{
        margin: auto;
        width: 50%;
        padding: 10px;
    }
</style>
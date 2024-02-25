<script setup>
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUpdateInventoryMutation} from 'queries/inventory/useUpdateInventoryMutation';

const router = useRouter()

const sessionId = router.currentRoute.value.query.session_id;
const itemType = router.currentRoute.value.query.item_type;

console.log(itemType);

const updateInventory = useUpdateInventoryMutation();

watchEffect( () => {
    if(!sessionId || !itemType) return
    updateInventory.mutate({sessionId,itemType}, {
        onSuccess: () => {
            router.replace({name :'shop'});
        }
    })
})

</script>
<template>
    <div class="payment-success">
        <h1 class="title">Payment Succes</h1>
        <p v-if="isEmpty">Nouveau Inventaire</p>
        <p v-else> Inventaire Existant</p>
    </div>
</template>
<style scoped>
    .payment-success{
        margin: auto;
        width: 50%;
        padding: 10px;
    }
</style>
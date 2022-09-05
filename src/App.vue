<template>
  <router-view/>
</template>

<script setup>
import userStore from '@/store/modules/user';

    const store = userStore();
    const params = { token:'0aaf66ea-f4d4-42b7-9f95-f29478e81aa6' };
    const getUserInfo = () => {
        store.login(params)
        .then((res)=> {})
        .catch((err)=>{
            console.log(err)
        })
    }
    getUserInfo();

        
</script>

<style lang="scss">
//@import url(./assets/styles/globals.scss);
</style>

<script lang="ts">
    import Loginform from "./lib/loginform.svelte";
    import Chat from "./lib/chat.svelte";

    import { currentUser } from "./lib/pb";
</script>


<main>
    <h1>Ayoub chat</h1>
    <Loginform/>
    {#if $currentUser}
        <Chat/>
    {/if}
</main>

<style>
    main{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1{
        position: absolute;
        left: 2%;
        top: 0%;
    }
</style>


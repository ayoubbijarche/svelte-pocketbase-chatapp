<script lang="ts">
    import svelteicon from "../assets/svelte.svg"
    import pbicon from "../assets/pb.svg";
    import {currentUser , pb} from "./pb";
    
    let username : string;
    let password : string;

    async function login(){
        await pb.collection("users").authWithPassword(username , password)
    }

    async function signup(){
        try{
            const data = {
                username,
                password,
                passwordConfirm : password,
            };
            
                const createduser = await pb.collection('users').create(data)
                await login()
            
            }catch (err){
                console.log(err);
        }
    }

    function signout(){
        pb.authStore.clear();
    }




</script>

{#if $currentUser}
    <button class="signoutbtn"  on:click={signout}>Sign out</button>
{:else}
<div class="outer">
    <div class="inner">
        <div class="imgcontainer">
            <img src={svelteicon} alt="svelte" class="svelteic"/>
            <img src={pbicon} alt="pocketbase" class="pocketicon"/>
        </div>
        

        <form class="form" on:submit|preventDefault>
            <p class="usrtxt">Username</p>
            <input type="text" bind:value={username}/>
            <p class="passtxt">Password</p>
            <input type="password" bind:value={password}/>

            <div class="innerbutton">
                <button on:click={login}>Log in</button>
                <button on:click={signup}>Sign up</button>
            </div>

        </form>
    </div>
</div>
{/if}


<style>

    .outer{
        margin-top: 30px;
        background-color: black;
        width: 400px;
        height: 500px;
        border: 1px solid black;
        border-radius: 15px;
    }

    .inner{
        display: flex;
        background-color: white;
        width: 400px;
        height: 500px;
        border: 1px solid black;
        border-radius: 15px;
        margin-left: 10px;
        margin-top: 10px;
        justify-content: center;
    }

    .form{
        font-family: "Rubik";
        margin-top: 0px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .usrtxt{
        margin-top: 100px;
        font-weight: 600;
        font-size: 15px;
    }

    .passtxt{
        font-weight: 600;
        font-size: 15px;
    }

    input{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        height: 50px;
        border-radius: 7px;
        font-family: "Rubik";
        font-size: 20px;
    }

    .innerbutton{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    button{
        background-color: black;
        border: none;
        font-weight: 700;
        color: white;
        font-size: 15px;
        border-radius: 5px;
        width: 150px;
        height: 40px;
        cursor: pointer;
    }

    .imgcontainer{
        display: flex;
        gap: 15px;
        position: absolute;
        margin-top: 10px;
    
    }

    .svelteic{
        width: 40px;
    }

    .pocketicon{
        width: 40px;
    }

    .signoutbtn{
        position: absolute;
        top: 4%;
        right: 3%;

    }

</style>

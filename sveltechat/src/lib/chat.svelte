<script lang="ts">
    import { onMount, onDestroy, afterUpdate } from "svelte";
    import { currentUser, pb } from "./pb";

    let messages = [];
    let newMsg: string;
    let unsubscribe: () => void;
    let messagesContainer: HTMLDivElement;

    onMount(async () => {
        const resultlist = await pb.collection('messages').getList(1, 3, {
            sort: 'created',
            expand: 'user'
        });

        messages = resultlist.items;

        unsubscribe = await pb
            .collection("messages")
            .subscribe('*', async ({ action, record }) => {
                if (action === "create") {
                    const user = await pb.collection('users').getOne(record.user, { expand: 'avatar' });
                    record.expand = { user };
                    messages = [...messages, record];
                }
                if (action === 'delete') {
                    messages = messages.filter((m) => m.id !== record.id);
                }
            });
    });

    onDestroy(() => {
        unsubscribe();
    });

    afterUpdate(() => {
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });

    async function sendMsg() {
        const data = {
            text: newMsg,
            user: $currentUser.id
        };

        await pb.collection("messages").create(data);
        newMsg = '';
    }

    function getAvatarUrl(user) {
        return user.avatar
            ? `${pb.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`
            : `https://avatars.dicebear.com/api/identicon/${user.id}.svg`;
    }
</script>

<div class="chatsection">
    <div class="messages-container">
        <div class="messages" bind:this={messagesContainer}>
            {#each messages as message (message.id)}
                <div class="msg">
                    <img
                        class="avatar"
                        src={getAvatarUrl(message.expand?.user)}
                        alt="avatar"
                        width="40px"/>
                    <div class="msg-content">
                        <small>
                            Sent by <span class="username">{message.expand?.user?.username}</span>
                        </small>
                        <p class="msg-text">{message.text}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    
    <form on:submit|preventDefault={sendMsg} class="textform">
        <input class="textarea" placeholder="Message" type="text" bind:value={newMsg} />
        <button type="submit" class="sendbtn">Send</button>
    </form>
</div>

<style>
    .chatsection {
        width: 470px;
        height: 550px;
        position: relative;
        border-radius: 10px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .messages-container {
        border-radius: 10px;
        padding: 10px;
        flex-grow: 1;
        overflow-y: auto;
    }

    .messages {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .textform {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-top: 1px solid #ccc;
        border-radius: 0 0 10px 10px;
    }

    .textarea {
        flex-grow: 1;
        height: 30px;
        border-radius: 7px;
        border: 2px solid black;
        margin-right: 10px;
    }

    .sendbtn {
        height: 35px;
        width: 65px;
        color: white;
        background-color: black;
        font-weight: 500;
        border: none;
        border-radius: 5px;
    }

    .msg {
        display: flex;
        align-items: center;
        background-color: black;
        color: white;
        padding: 10px;
        border-radius: 10px;
    }

    .avatar {
        border-radius: 50%;
        margin-right: 10px;
    }

    .msg-content {
        display: flex;
        flex-direction: column;
    }

    .msg-text {
        margin: 0;
    }

    .username {
        color: red;
        font-weight: bold;
    }

    small {
        color: gray;
    }
</style>


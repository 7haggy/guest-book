<template>
    <div class="comment-block">
        <div class="head-group">
            <div class="name">{{ userName }}</div>
            <div class="icon-group" v-if="isEditable">
                <b-button class="btn p-0" variant="light" @click="$emit('editComment')"
                    ><img class="edit-icon" src="../assets/images/edit-icon.svg"
                /></b-button>
                <b-button class="btn p-0 ml-2" variant="light" @click="$emit('removeComment')"
                    ><img class="remove-icon" src="../assets/images/remove-icon.svg"
                /></b-button>
            </div>
        </div>
        <div class="comment">{{ text }}</div>
    </div>
</template>
<script>
    export default {
        name: "CommentBlock",
        props: {
            text: {
                type: String,
                required: true,
                default: "",
            },
            userName: {
                type: String,
                required: true,
                default: "",
            },
            isEditable: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    };
</script>
<style scoped>
    .comment-block {
        padding: 10px 20px 10px 20px;
        border-radius: 10px;
    }

    .name {
        font-weight: bold;
    }

    .comment {
        margin-top: 15px;
        max-height: 300px;
        overflow: auto;
    }

    .head-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .btn {
        background-color: transparent;
    }

    .edit-icon {
        width: 25px;
        height: 25px;
    }

    .remove-icon {
        height: 15px;
    }
</style>

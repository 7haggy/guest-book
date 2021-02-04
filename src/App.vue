<template>
    <div id="app">
        <div class="container">
            <the-navbar />
            <h1 class="title">Список отзывов</h1>
            <div class="comment-group">
                <drop-list :items="comments" @reorder="$event.apply(comments)">
                    <template v-slot:item="{ item }">
                        <drag
                            :key="item.id"
                            :data="item"
                            @cut="remove(comments, item)"
                            :disabled="!activeUser || !activeUser.isAdmin || editableComment != null"
                        >
                            <commnet-block
                                :text="item.text"
                                :userName="item.userName"
                                :isEditable="activeUser ? item.userId == activeUser.login || activeUser.isAdmin : false"
                                @editComment="
                                    editableComment = item;
                                    text.val = item.text;
                                "
                                @removeComment="removeComment(item)"
                            />
                        </drag>
                    </template>
                </drop-list>
                <div class="form-group mt-5">
                    <b-form-textarea
                        id="textarea"
                        v-model="text.val"
                        :class="{ error: text.error }"
                        placeholder="Оставить отзыв..."
                        rows="3"
                        max-rows="6"
                    ></b-form-textarea>
                    <b-button class="mt-3 mr-4" variant="success" @click="saveComment(editableComment)"
                        >Отправить</b-button
                    >
                    <b-button
                        class="mt-3"
                        variant="danger"
                        v-if="editableComment"
                        @click="
                            editableComment = null;
                            text.val = '';
                        "
                        >Отменить</b-button
                    >
                </div>
            </div>
        </div>
        <auth-modal />
        <registration-modal />
    </div>
</template>

<script>
    import TheNavbar from "./components/TheNavbar";
    import AuthModal from "./components/modals/AuthModal";
    import RegistrationModal from "./components/modals/RegistrationModal";
    import CommnetBlock from "./components/CommnetBlock.vue";
    import { Drag, DropList } from "vue-easy-dnd";
    import { mapState } from "vuex";

    export default {
        name: "App",
        components: {
            TheNavbar,
            AuthModal,
            RegistrationModal,
            CommnetBlock,
            Drag,
            DropList,
        },
        data() {
            return {
                editableComment: null,
                text: { val: "", error: false },
                comments: [
                    { id: 1, userName: "Анонимно", text: "Тестовый комментарий 1", userId: null },
                    { id: 2, userName: "user", text: "Тестовый комментарий 2", userId: "user" },
                    { id: 3, userName: "admin", text: "Тестовый комментарий 3", userId: "admin" },
                    { id: 4, userName: "Анонимно", text: "Тестовый комментарий 4", userId: null },
                ],
            };
        },
        computed: mapState(["activeUser"]),
        methods: {
            saveComment(comment) {
                if (!this.text.val) {
                    this.text.error = true;
                    this.$bvToast.toast("Заполните обязательное поле.", {
                        title: "Добавление отзыва",
                        variant: "danger",
                    });
                } else {
                    let index = this.comments.indexOf(comment);

                    if (
                        comment != null &&
                        this.activeUser &&
                        (this.activeUser.login == this.comments[index].userId || this.activeUser.isAdmin)
                    ) {
                        this.comments[index].text = this.text.val;
                        this.editableComment = null;
                        this.text = { val: "", error: false };
                        this.$bvToast.toast("Отзыв успешно изменен.", {
                            title: "Редактирование отзыва",
                            variant: "success",
                        });
                    } else {
                        this.comments.unshift({
                            id: this.comments.reduce((sum, curr) => {
                                return sum + curr.id;
                            }, 1),
                            userName: this.activeUser ? this.activeUser.login : "Анонимно",
                            text: this.text.val,
                            userId: this.activeUser ? this.activeUser.login : null,
                        });
                        this.$bvToast.toast("Отзыв успешно добавлен.", {
                            title: "Добавление отзыва",
                            variant: "success",
                        });
                        this.text = { val: "", error: false };
                    }
                }
            },
            removeComment(comment) {
                let index = this.comments.indexOf(comment);
                if (
                    this.activeUser &&
                    (this.activeUser.login == this.comments[index].userId || this.activeUser.isAdmin)
                ) {
                    if (this.editableComment) {
                        this.$bvToast.toast("Необходимо сохранить изменения.", {
                            title: "Удаление отзыва",
                            variant: "danger",
                        });
                    } else {
                        this.$bvModal
                            .msgBoxConfirm("Вы действительно хотите удалить отзыв?", {
                                okTitle: "Удалить",
                                cancelTitle: "Отменить",
                            })
                            .then((value) => {
                                if (value) {
                                    this.comments.splice(index, 1);
                                }

                                this.$bvToast.toast("Отзыв успешно удален.", {
                                    title: "Удаление отзыва",
                                    variant: "success",
                                });
                            })
                            .catch(() => {
                                this.$bvToast.toast("Не удалось удалить отзыв.", {
                                    title: "Удаление отзыва",
                                    variant: "danger",
                                });
                            });
                    }
                }
            },
        },
    };
</script>
<style>
    @import "./assets/main.css";
</style>
<style scoped>
    .title {
        margin-top: 80px;
    }

    .comment-group {
        margin-top: 30px;
    }
</style>

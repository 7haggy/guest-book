<template>
    <b-modal id="modal-auth" title="Авторизоваться" hide-footer>
        <b-form @submit.prevent="auth">
            <label for="login">Логин <span class="color-red">*</span></label>
            <b-form-input :class="{ error: form.login.error }" v-model="form.login.val" id="login"></b-form-input>
            <label class="mt-3" for="pass">Пароль <span class="color-red">*</span></label>
            <b-form-input
                :class="{ error: form.pass.error }"
                v-model="form.pass.val"
                type="password"
                id="pass"
            ></b-form-input>
            <div class="mt-4">
                <b-button variant="primary" type="submit" class="mr-3">Войти</b-button>
                <b-button
                    variant="success"
                    @click="
                        $bvModal.hide('modal-auth');
                        $bvModal.show('modal-registration');
                    "
                    >Регистрация</b-button
                >
            </div>
        </b-form>
    </b-modal>
</template>
<script>
    import { mapMutations } from "vuex";
    import { mapState } from "vuex";

    export default {
        name: "AuthModal",
        data() {
            return {
                form: {
                    login: {
                        val: "",
                        error: false,
                    },
                    pass: {
                        val: "",
                        error: false,
                    },
                },
            };
        },
        computed: mapState(["users", "activeUser"]),
        methods: {
            auth() {
                let isFormValid = true;
                for (let key in this.form) {
                    if (!this.form[key].val) {
                        this.form[key].error = true;
                        isFormValid = false;
                    } else {
                        this.form[key].error = false;
                    }
                }
                if (!isFormValid) {
                    this.$bvToast.toast("Проверьте правильность заполнения полей", {
                        title: "Авторизация",
                        variant: "danger",
                    });
                } else {
                    for (let i in this.users) {
                        if (this.users[i].login == this.form.login.val && this.users[i].pass == this.form.pass.val) {
                            this.updateActiveUser(this.users[i]);
                            this.form = {
                                login: {
                                    val: "",
                                    error: false,
                                },
                                pass: {
                                    val: "",
                                    error: false,
                                },
                            };
                            this.$bvToast.toast("Авторизация прошла успешно", {
                                title: "Авторизация",
                                variant: "success",
                            });
                            this.$bvModal.hide("modal-auth");
                            break;
                        }
                    }

                    if (!this.activeUser) {
                        this.$bvToast.toast("Проверьте правильность заполнения полей", {
                            title: "Авторизация",
                            variant: "danger",
                        });
                    }
                }
            },
            ...mapMutations(["updateActiveUser"]),
        },
    };
</script>

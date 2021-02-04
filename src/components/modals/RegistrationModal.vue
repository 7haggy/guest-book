<template>
    <b-modal id="modal-registration" title="Регистрация" hide-footer>
        <b-form @submit.prevent="registrationUser">
            <label for="login">Логин <span class="color-red">*</span></label>
            <b-form-input :class="{ error: form.login.error }" v-model="form.login.val" id="login"></b-form-input>
            <label class="mt-3" for="pass">Пароль <span class="color-red">*</span></label>
            <b-form-input
                :class="{ error: form.pass.error }"
                v-model="form.pass.val"
                type="password"
                id="pass"
            ></b-form-input>
            <label class="mt-3" for="pass2">Повторите пароль <span class="color-red">*</span></label>
            <b-form-input
                :class="{ error: form.pass2.error }"
                v-model="form.pass2.val"
                type="password"
                id="pass2"
            ></b-form-input>
            <div class="mt-4">
                <b-button variant="primary" class="mr-3" type="submit">Зарегистрироваться</b-button>
                <b-button
                    variant="success"
                    @click="
                        $bvModal.hide('modal-registration');
                        $bvModal.show('modal-auth');
                    "
                    >Войти</b-button
                >
            </div>
        </b-form>
    </b-modal>
</template>
<script>
    import { mapMutations } from "vuex";
    import { mapState } from "vuex";

    export default {
        name: "RegistrationModal",
        data() {
            return {
                form: {
                    login: { val: "", error: false },
                    pass: { val: "", error: false },
                    pass2: { val: "", error: false },
                },
            };
        },
        computed: mapState(["users"]),
        methods: {
            registrationUser() {
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
                        title: "Регистрация",
                        variant: "danger",
                    });
                } else if (this.form.pass.val != this.form.pass2.val) {
                    this.form.pass.error = true;
                    this.form.pass2.error = true;
                    this.$bvToast.toast("Пароли не совпадают", {
                        title: "Регистрация",
                        variant: "danger",
                    });
                } else {
                    let isUserRegistered = false;
                    for (let i in this.users) {
                        if (this.users[i].login == this.form.login.val) {
                            this.$bvToast.toast("Пользователь с таким логином уже зарегистрирован", {
                                title: "Регистрация",
                                variant: "danger",
                            });
                            isUserRegistered = true;
                            break;
                        }
                    }

                    if (!isUserRegistered) {
                        this.registration({ login: this.form.login.val, pass: this.form.pass.val, isAdmin: false });
                        this.form = {
                            login: { val: "", error: false },
                            pass: { val: "", error: false },
                            pass2: { val: "", error: false },
                        };
                        this.$bvToast.toast("Регистрация прошла успешно", {
                            title: "Регистрация",
                            variant: "success",
                        });
                        this.$bvModal.hide("modal-registration");
                    }
                }
            },
            ...mapMutations(["updateActiveUser", "registration"]),
        },
    };
</script>

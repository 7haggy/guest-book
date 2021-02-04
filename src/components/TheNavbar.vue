<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Гостевая книга</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right v-if="!activeUser">
                        <template #button-content>
                            <em>Аноним</em>
                        </template>
                        <b-dropdown-item v-b-modal="'modal-auth'">Авторизоваться</b-dropdown-item>
                        <b-dropdown-item v-b-modal="'modal-registration'">Зарегистрироваться</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown right v-else>
                        <template #button-content>
                            <em>{{ activeUser.login }}</em>
                        </template>
                        <b-dropdown-item @click="$store.commit('updateActiveUser', null)">Выйти</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
    import { mapState } from "vuex";

    export default {
        name: "TheNavbar",
        computed: mapState(["activeUser"]),
    };
</script>

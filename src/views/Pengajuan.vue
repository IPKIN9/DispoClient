<template>
    <div class="wrapper sidebar_minimize">
        <div class="main-header">
            <TopBar />
        </div>

        <!-- Sidebar -->
        <SideBar />
        <!-- End Sidebar -->

        <div class="main-panel">
            <div class="content">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <h3><b>Form Pengajuan</b></h3>
                                </div>
                                <div class="card-body">
                                    <form action="" class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Nama Lengkap</label>
                                                <BaseInput placeholder="Masukan disini..." />
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Stambuk</label>
                                                <BaseInput placeholder="Masukan disini..." />
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Prodi</label>
                                                <BaseInput placeholder="Masukan disini..." />
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label">Fakultas</label>
                                                <BaseInput placeholder="Masukan disini..." />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Keterangan</label>
                                                <textarea class="form-control" name="" id="" cols="30" rows="10">

                                </textarea>
                                            </div>
                                            <button class="btn btn-primary ml-2 mt-2">Kirim</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import BaseInput from '../components/Input/BaseInput.vue'
import SideBar from '../components/skelton/SideBar.vue';
import TopBar from '../components/skelton/TopBar.vue';

</script>
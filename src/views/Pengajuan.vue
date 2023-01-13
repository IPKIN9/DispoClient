<template>
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
                                <textarea class="form-control" name="" id="" cols="30" rows="14">

                                </textarea>
                            </div>	
                       </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import BaseInput from '../components/Input/BaseInput.vue'
</script>
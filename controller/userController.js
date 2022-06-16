const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')

exports.registrasiUser = (data) =>
    new Promise(async (resolve, reject) => {
        const salt = bcrypt.genSaltSync(10)
        const encript = bcrypt.hashSync(data.password, salt)
        Object.assign(data, {
            password: encript
        })
        userModel.findOne({
            email: data.email
        }).then((sudahAdaUser) => {
            if (sudahAdaUser) {
                reject({
                    status: false,
                    msg: 'Email sudah terdaftar'
                })
            } else {
                userModel.create(data)
                    .then(() => {
                        resolve({
                            status: true,
                            msg: 'Berhasil membuat user baru'
                        })
                    }).catch(err => {
                        reject({
                            status: false,
                            msg: 'Terjadi kesalahan pada server'
                        })
                    })
            }
        })
    })
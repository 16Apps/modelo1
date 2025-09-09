app.controller('contaCtrl', function ($scope, $http, params, uteisService, $location) {


    $scope.options = {
        headers: { 'Content-Type': 'application/json' }
    };

    $scope._regConta = {
        _id: uteisService.onGetID(),
        ativo: 1,
        nome: '',
        celular: '',
        email: '',
        senha: '',
        cnpj: '',
        razao_social: '',
        valor_cafe: '',
        horario_presenca: '00:00',
        tolerancia_atraso: '15'
    }

    $scope._edtUsuario = {
        _id: uteisService.onGetID(),
        id_conta: "",
        ativo: 1,
        nome: "",
        email: "",
        senha: ""
    }
    $scope._regUsuarios = []

    $scope.$watch('$viewContentLoaded', async function () {
        const currentUrl = $location.absUrl();
        let url = currentUrl.split('/')
        console.log(uteisService.getCookie('_conta'))
        if (url[3] == 'minha-conta'){
            $scope._regConta                = uteisService.getCookie('_conta')
            $scope._edtUsuario.id_conta     = $scope._regConta
            $scope.$apply()
        }
    })

    $scope.onCadastrar = async function () {
        console.log($scope._regConta)
        if ($scope._regConta.nome == '') {
            uteisService.onToast('Ops .. o nome é importante.', 'error', 2000, 'top-end');

        } else if ($scope._regConta.email == '') {
            uteisService.onToast('Informe o seu e-mail mais utilizado.', 'error', 2000, 'top-end');

        } else if ($scope._regConta.senha == '') {
            uteisService.onToast('Sem a senha ? ', 'error', 2000, 'top-end');

        } else {

            await uteisService.getBase('?c=conta&email=' + $scope._regConta.email)
                .then((res) => {
                    if (res.length > 0) {
                        uteisService.onMsgBox('Atenção!', 'O e-mail informado já está vinculado a uma conta', 'error');
                    } else {
                        uteisService.patchBase('/conta', $scope._regConta)
                            .then((res) => {

                                uteisService.onToast('Tudo certo! Conta criada.', 'info', 2000, 'top-end');
                                uteisService.setCookie('_conta', JSON.stringify($scope._regConta), 365);

                                setTimeout(() => {
                                    window.location.assign("/filiados");
                                }, 2200);

                            })
                            .catch((error) => {
                                uteisService.onToast('Algo deu errado, tente novamente por favor.', 'error', 2000, 'top-end');
                            });

                    }
                })
                .catch((error) => {
                    uteisService.onToast('Algo deu errado, tente novamente por favor.', 'error', 2000, 'top-end');
                });
        };
    };

    $scope.onEntrar = async function () {

        if ($scope._regConta.email == '') {
            uteisService.onToast('Ops .. faltou informar o email.', 'error', 2000, 'top-end');

        } else if ($scope._regConta.senha == '') {
            uteisService.onToast('Informe a sua senha.', 'error', 2000, 'top-end');

        } else {

            console.log($scope._regConta)

            await uteisService.getBase('?c=conta&email=' + $scope._regConta.email + '&senha=' + $scope._regConta.senha)
                .then((res) => {
                    console.log(res)
                    if (res.length == 0) {
                        uteisService.onMsgBox('Atenção!', 'Não encontramos sua conta, com os dados informado.', 'error');
                    } else {

                        uteisService.onToast('Olá! Bem-vindo, ' + res[0].nome + '.', 'info', 2000, 'top-end');
                        uteisService.setCookie('_conta', JSON.stringify(res[0]), 365);
                        setTimeout(() => {
                            // window.location.assign("/dashboard");
                            window.location.assign("/filiados");
                        }, 2200);

                    };
                })
                .catch((error) => {
                    uteisService.onToast('Algo deu errado, tente novamente por favor.', 'error', 2000, 'top-end');
                });

        };
    };

    $scope.onAtualizar = async function () {

        if ($scope._regConta.nome == '') {
            uteisService.onToast('Ops .. o nome é importante.', 'error', 2000, 'top-end');

        } else if ($scope._regConta.email == '') {
            uteisService.onToast('Informe o seu e-mail mais utilizado.', 'error', 2000, 'top-end');

        } else if ($scope._regConta.senha == '') {
            uteisService.onToast('Sem a senha ? ', 'error', 2000, 'top-end');

        } else {

            let apelido = $scope._regConta.nome.split(' ');
            $scope._regConta.apelido = apelido[0];

            uteisService.patchBase('/conta', $scope._regConta)
                .then((res) => {

                    uteisService.onToast('Dados atualizados!', 'info', 2000, 'top-end');
                    uteisService.setCookie('_conta', JSON.stringify($scope._regConta), 365);

                })
                .catch((error) => {
                    uteisService.onToast('Algo deu errado, tente novamente por favor.', 'error', 2000, 'top-end');
                });

        };
    };

    $scope.onCadastrarUsuario = async function () {
        if ($scope._edtUsuario.nome == '') {
            uteisService.onToast('Ops .. o nome é importante.', 'error', 2000, 'top-end');

        } else if ($scope._edtUsuario.email == '') {
            uteisService.onToast('Informe o e-mail.', 'error', 2000, 'top-end');

        } else if ($scope._edtUsuario.senha == '') {
            uteisService.onToast('Sem a senha ?', 'error', 2000, 'top-end');
        } else {
            uteisService.patchBase('/usuarios', $scope._regConta)
                .then((res) => {
                    uteisService.onToast('Usuário cadastro!', 'info', 2000, 'top-end');
                })
                .catch((error) => {
                    uteisService.onToast('Algo deu errado, tente novamente por favor.', 'error', 2000, 'top-end');
                });
        }
    }

    $scope.onCarregaUsuarios = async function () {

        await uteisService.getBase(`?c=usuario&id_conta=${$scope._regConta._id}&pop=id_conta`)
            .then((res) => {
                $scope._regUsuarios = res;
                $scope.$apply();
            })
            .catch((error) => {
                uteisService.onToast('Algo deu errado, tente novamente por favor.', 'error', 2000, 'top-end');
            });
    };

    // $scope.onBuscaCep = async function () {

    //     let cep = $scope._regConta.cep.replace('.', '').replace('-', '').trim();

    //     await uteisService.getCep(cep)
    //         .then((res) => {

    //             console.log(JSON.stringify(res))

    //             $scope._regConta.logradouro = res.logradouro;
    //             $scope._regConta.bairro = res.bairro;
    //             $scope._regConta.cidade = res.localidade;
    //             $scope._regConta.estado = res.uf;

    //         })
    //         .catch((error) => {
    //             uteisService.onToast('Algo deu errado, tente novamente por favor.', 'error', 2000, 'top-end');
    //         });

    // };

    // $scope.onGetFoto = function () {
    //     document.getElementById('imgload').click();
    // };

    // try {
    //     $('document').ready(function () {
    //         $("#imgload").change(function () {
    
    //             $scope.$apply(function () {
    //                 $scope._regConta._foto = "../assets/img/load_foto.gif"
    //             })
    
    //             if (this.files && this.files[0]) {
    //                 var reader = new FileReader();
    //                 reader.onload = function (e) {
    //                     setTimeout(() => {
    //                         $scope.$apply(function () {
    //                             $scope._regConta._foto = e.target.result
    //                             // $scope.onPostFoto(e.target.result)
    //                         })
    //                     }, 1200);
    //                 }
    //                 reader.readAsDataURL(this.files[0]);
    //             }
    //         });
    //     }); 
    // } catch (error) {}

    // $scope.onPostFoto = function (foto) {

    //     let reg = [];
    //     reg.push({
    //         foto: foto
    //     })

    //     let _url = uteisService.apiUrl_()

    //     $http.post(_url + '/save', reg, $scope.options)
    //         .then(function (res) {

    //             $scope._regConta.foto = res.data[0].id_foto
    //             $scope._regConta._foto = _url + '/image/' + res.data[0].id_foto

    //         }, function (error) {
    //             alert(JSON.stringify(error))
    //             // $scope.msgBox("Ops.. erro", JSON.stringify(error), "error");
    //         });

    // };

    $scope._onMessage = async function () {

        // uteisService.onMsgBox('Olá','teste','error')
        uteisService.onQuestion('Está tudo certo...', 'info', 2000, 'top-end')

    };

});
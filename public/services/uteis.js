app.service('uteisService', ['$rootScope', '$http', function ($rootScope, $http) {

  moment.locale('pt-br');

  const service = this;
  service.ipAPI = 'http://localhost:3001';


  // api
  //  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  this.options = {
    headers: { 'Content-Type': 'application/json' }
  };

  this.getBase = function (url) {
    return new Promise((resolve, reject) => {
      console.log('getBase:: ' + service.ipAPI + '/_bd' + url)

      $http.get(service.ipAPI + '/_bd' + url, this.options)
        .then((res) => {
          console.log(res);
          resolve(res.data); 
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  this.patchBase = function (url, reg) {
    return new Promise((resolve, reject) => {
      console.log('patchBase:: ' + service.ipAPI + '/_bd' + url);
      console.log('patchBase:: ' + JSON.stringify(reg));

      $http.patch(service.ipAPI + '/_bd' + url, reg, this.options)
        .then((res) => {
          console.log(res);
          resolve(res.data); 
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  this.posthBase = function (url, reg) {
    return new Promise((resolve, reject) => {
      console.log('posthBase:: ' + service.ipAPI + '/_bd' + url);
      console.log('posthBase:: ' + JSON.stringify(reg));

      $http.post(service.ipAPI + '/_bd' + url, reg, this.options)
        .then((res) => {
          console.log(res);
          resolve(res.data); 
        })
        .catch((error) => {
          console.log(error);
          reject(error); 
        });
    });
  };

  this.delBase = async function (url) {

    console.log('delBase:: ' + service.ipAPI + '/_bd/' + url)

    return $http.delete(service.ipAPI + '/_bd/' + url, this.options)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.error('Erro ao fazer GET:', error);
        throw error; 
      });
  };

  this.onGetID = function () {
    return 'xxxxxxxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16).toLocaleLowerCase();
    });
  };
  
  this.apiUrl_ = function () {
    return this.ipAPI + '....'
  };

  this.apiOptions = function () {
    return this.options
  };

  // final api
  //  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  
  // interação
  //  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  this.onToast = function (msg, icon, time, position = 'bottom') {
    // 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end'
    const Toast = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: time,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: msg
    })
  };

  this.onMsgBox = function (titulo, msg, tipo) {
    Swal.fire({
      title: titulo,
      text: msg,
      icon: tipo 
    });
  };

  this.onQuestion = function (titulo, msg) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: titulo,
        text: msg,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#689F38',
        confirmButtonText: 'Sim, desejo',
        cancelButtonColor: '#E53935',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  };

  // fim interação
  //  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_


  // uteis
  //  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  this.formataDataHora = function (data) {
    const date = moment(data, 'YYYY-MM-DD');
    const hour = moment(data, 'HH:mm:ss')
    return date.format('DD/MM/YYYY') + ' ' + hour.format('HH:mm:ss');
  };

  this.formataData = function (data) {
    const date = moment(data, 'YYYY-MM-DD');
    return date.format('DD/MM/YYYY');
  };

  this.selStatusMovimentacao = function () {

    let status = [
      { _id: 'pendente', desc: 'Pendente' },
      { _id: 'confirmado', desc: 'Confirmado' },
      { _id: 'emandamento', desc: 'Em andamento' },
      { _id: 'concluido', desc: 'Concluído' },
      { _id: 'cancelado', desc: 'Cancelado' },
    ]

    return status
  };

  // fim uteis
  //  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_



  // cookie
  //  -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

  this.setCookie = function (name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";

    return 'setCookie';
  };

  this.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) {

        try {
          return JSON.parse(c.substring(nameEQ.length, c.length));
        } catch (error) {
          return null
        }
      }
    }
    return null;
  };

  this.eraseCookie = function (name) {
    document.cookie = name + '=; Max-Age=-99999999;';
    return 'eraseCookie'
  };

  this.setLocalStorage = function (name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = date.toUTCString();
      var item = {
        value: value,
        expires: expires
      };
      localStorage.setItem(name, JSON.stringify(item));
    } else {
      localStorage.setItem(name, value);
    }
    return 'setLocalStorage';
  };

  this.getLocalStorage = function (name) {
    var itemStr = localStorage.getItem(name);
    if (!itemStr) {
      return null;
    }

    try {
      var item = JSON.parse(itemStr);
      if (item.expires) {
        var now = new Date();
        if (now.toUTCString() > item.expires) {
          localStorage.removeItem(name);
          return null;
        }
        return item.value;
      }
      return itemStr;
    } catch (e) {
      return itemStr;
    }
  };

  this.eraseLocalStorage = function (name) {
    localStorage.removeItem(name);
    return 'eraseLocalStorage';
  };

  // fim cookie
  // -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

}]);
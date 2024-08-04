const ru = {
  translation: {
    loginPage: {
      enter: 'Войти',
      nickname: 'Ваш Ник',
      password: 'Пароль',
      withoutAcc: 'Нет аккаунта?',
      reg: 'Регистрация',
      loginError: 'Неверные имя пользователя или пароль',
    },
    mainPage: {
      channels: 'Каналы',
      enterMessage: 'Введите сообщение...',
      quitBtn: 'Выйти',
      newMessage: 'Новое сообщение',
      deleteChannel: 'Удалить',
      renameChannel: 'Переименовать',
      messagesCount: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      },
      channelMenu: 'Управление каналом',
    },
    modal: {
      createChannel: {
        createNewChannel: 'Создать новый канал',
        send: 'Отправить',
        cancel: 'Отменить',
        addChannel: 'Добавить канал',
        channelNameCount: 'От 3 до 20 символов',
        channelName: 'Имя канала',
        channelCreated: 'Канал создан!',
      },
      editChannel: {
        renameChannelNotification: 'Канал переименован!',
        renameChannel: 'Переименовать канал',
        newName: 'Введите новое имя',
      },
      deleteChannel: {
        deleteChannel: 'Удалить канал',
        sure: 'Уверены?',
        delete: 'Удалить',
        sucess: 'Канал удалён',
      },
    },
    regForm: {
      regErrors: 'Такой пользователь уже существует',
      register: 'Зарегистрироваться',
      confirmPassword: 'Подтвердите пароль',
      charactersCount: 'От 3 до 20 символов',
      charasterCountPassword: 'Не менее 6 символов',
      userName: 'Имя пользователя',
    },
    notFoundPage: {
      notFound: 'Страница не найдена',
      youCanMove: 'Но вы можете перейти',
      mainPage: 'на главную страницу',
    },
    toast: {
      errorNetwork: 'Ошибка соединения',
    },
    validation: {
      required: 'Обязательное поле',
      maxCount: 'Имя должно быть короче 21 символа',
      uniqName: 'Имя канала должно быть уникальным',
      minCountPass: 'Пароль должен содержать не менее 6 символов',
      matchPass: 'Пароли должны совпадать',
    },
  },
};

export default ru;

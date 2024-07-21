# instasenac-api
## Inicialização
Para iniciar a API basta acessar o diretório raiz da aplicação instasenac-api e executar os seguintes comandos 
para instalar as dependências e executar, respectivamente:
```
npm install
npm start
```
A API estará acessível em `http://localhost:3030`.

## Endpoints
### Criação de novo usuário
```
- REQUEST
[POST] http://localhost:3030/users/signup
[BODY]
{
    userName: 'senac',
    password: '123456',
    userProfilePhotoUrl: 'http://senac.com.br/imagesenac...'
}
[HEADERS]
{
    Content-type: 'application/json'
}

- RESPONSE
[SUCESSO]
    [STATUS] 204

[ERRO]
    [STATUS] 50x
    [BODY]
        {
            message: 'Erro...'
        }
```
`userName`: login

`password`: senha

`userProfilePhotoUrl`: URL do perfil do novo usuário.

### Login
```
- REQUEST
[POST] http://localhost:3030/users/login
[BODY]
{
    userName: 'senac',
    password: '123456'
}
[HEADERS]
{
    Content-type: 'application/json'
}

- RESPONSE
[SUCESSO]
    * Autenticado
        [STATUS] 200
        [BODY]
        {
            id: 1,
            name: 'senac'
        }
        [HEADERS]
        {
            x-access-token: 'jruisd3u41bisdabfi34'
        }

    * Não Autenticado
        [STATUS] 401
        [BODY]
        {
            message: 'Falha na autenticação do usuário senac!'
        }
        
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Erro...'
    }
```
`x-access-token`: token devolvido deve ser usado para fazer novas requisições.

### Listagem de fotos
```
- REQUEST
[GET] http://localhost:3030/:userName/photos
[HEADERS]
{
    x-access-token: 'jruisd3u41bisdabfi34'
}

- RESPONSE
[SUCESSO]
    [STATUS] 200
    [BODY]
    [
        {
            allowComments: false,
            comments: 0,
            description: "comentario...",
            id: 2,
            likes: 5,
            postDate: "2024-07-13T12:30:25.000Z",
            url: "https://instagram.fcgh9-sdaffsda",
            userId: 1
        }
    ]
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Erro...'
    }
```
Retorna *array* com a listagem de fotos do usuário `userName` informado na URL.

### Remoção de fotos
```
- REQUEST
[DELETE] http://localhost:3000/photos/:photoId
[HEADERS]
{
    x-access-token: 'jruisd3u41bisdabfi34'
}

- RESPONSE
[SUCESSO]
    * Sucesso na remoção
        [STATUS] 200
    
    * Foto não existente
        [STATUS] 404
        [BODY]
        {
            message: 'Foto inexistente'
        }
    
    * Usuário não autorizado para exclusão
        [STATUS] 403
        [BODY]
        {
            message: 'Forbidden: Usuário sem autorização!'
        }
    
[ERRO]
    [STATUS] 50x
    [BODY]
    {
        message: 'Erro...'
    }
```
`:photoId`: ID da foto a ser removida 

`x-access-token`: Campo obrigatório referente a autenticação do usuário

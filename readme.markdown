# Front in Floripa 2015
> Maior evento front-end de Santa Catarina

## Desenvolvimento

1) Clone o projeto

```
git clone git@github.com:frontinfloripa/frontinfloripa.com.br.git
```

2) Abra a pasta

```
cd frontinfloripa
```

3) Instale as dependências

```
npm install
```

4) Rode o site localmente, usando o comando:

```
gulp server
```

5) Abra o site em:

```
http://localhost:5000
```

Observações:

- O projeto tem *livereload*, isso que dizer que qualquer mudança feita na pasta `src` automaticamente a página vai atualizar.
- Todas as imagens ficam na pasta `dist/assets/img`.
- Agenda, Palestrantes, Patrocinios e Apoios ficam na pasta `src/data/`, ontem tem vários arquivos YML.
- Lembre-se de ter o plugin `editorconfig` instalado no seu editor de texto para que os arquivos fiquem com as configurações corretas.

### Deploy para produção

Essa parte é bem importante. Quando tudo ficar pronto, agora é hora de mandar pra produção, através do comando:

```
gulp deploy
```




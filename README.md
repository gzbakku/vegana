# vegana cli

## new docs
please visit https://veganajs.web.app for docs

## old docs
please visit http://vegana.github.io for docs

## install directions

### windows

```
npm i -g vegana
```

### linux (ubuntu)

linux node-modules need --unsafe-perm flag to install

```
npm i -g vegana --unsafe-perm
```

## new features
  - UI core can upgrade to latest design
  - now UI libs can be statically linked to lazy modules so they can be removed from main bundle and be added to where they are needed.
  - default project index now have a sample routing function and explains internal routing a little bit.

## workflow notes

  - statically linked ui libs cant be compiled unless there parent module is compiled so while developing static ui libs link them in main bundle and make them lazy after you have finished with development.
  - UI bundles should be linked carefully so no unused code is present in production modules.

## openssl in dev server

  - to make ssl cert for https dev server we use native openssl and will only work if openssl is available via cli.

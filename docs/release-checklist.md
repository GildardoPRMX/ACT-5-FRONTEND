# Lista de liberación Frontend 1.0.0

## Calidad

- [x] Instalación congelada aprobada.
- [x] `pnpm verify` aprobado.
- [x] Nueve pruebas aprobadas.
- [x] Build y preview locales aprobados.

## Producción

- [ ] `VITE_API_URL` usa HTTPS y `/api`.
- [ ] `CORS_ORIGIN` coincide con Frontend.
- [ ] `render.yaml` sincronizado con el servicio.
- [ ] Rewrite SPA comprobado en producción.
- [ ] Salud y Atlas responden 200.
- [ ] Prueba de humo aprobada.

## Aceptación

- [ ] Registro, login, restauración y logout.
- [ ] CRUD como `user`.
- [ ] 403 de `user` y 204 de `admin`.
- [ ] Filtros, paginación, detalle y 404.
- [ ] 401 elimina sesión inválida.

## Seguridad y versión

- [ ] No existen secretos en Git.
- [x] No existen secretos en Git.
- [x] Evidencias omiten credenciales.
- [x] README, CHANGELOG y evidencias actualizados.
- [ ] `v1.0.0` apunta al commit desplegado.

La liberación queda pendiente de las URLs de producción y un Backend compatible con A11/A12. Las casillas se marcan solo al reunir esa evidencia.

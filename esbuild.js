const { build, analyzeMetafile } = require('esbuild')

async function buildAndAnalyze() {
    try {
        const result = await build({
            entryPoints: ['src/index.ts'],
            bundle: true,
            platform: 'node', // o 'browser', según sea necesario
            sourcemap: true,
            minify: true,
            target: ['es2020'], // o la versión de ECMAScript que necesites
            metafile: true, // lista de paquetes a excluir del bundle
            splitting: true,
            format: 'esm',
            outdir: 'dist',
        })

        const analysis = await analyzeMetafile(result.metafile, { color: true })
        console.log(analysis)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

buildAndAnalyze()

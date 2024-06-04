const { build, analyzeMetafile } = require('esbuild')

async function buildAndAnalyze() {
    try {
        const result = await build({
            entryPoints: ['src/index.ts'],
            bundle: true,
            platform: 'node',
            minify: true,
            target: ['es2020'],
            metafile: true,
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

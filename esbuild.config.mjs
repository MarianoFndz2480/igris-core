import * as esbuild from 'esbuild'

async function build() {
    try {
        await esbuild.build({
            entryPoints: ['src/index.ts'],
            outfile: 'dist/index.js',
            platform: 'node',
            bundle: true,
            external: ['node_modules'],
            minify: true,
        })
        console.log('Build successful!')
    } catch (error) {
        console.error('Build failed:', error)
    }
}

build()

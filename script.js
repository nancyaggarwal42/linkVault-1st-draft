const tabs = document.querySelectorAll('.tab-btn')

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        // removing active styles
        tab.forEach((btn) => {
            btn.classList.remove(
                'border-indigo-600',
                'text-gray-800',
                'border-b-2'
            )

            btn.classList.add('text-gray-400')
        })

        // adding styles
        tab.classList.add(
            'border-b-2',
            'border-indigo-600',
            'text-gray-800'
        )

        tab.classList.remove('text-gray-400')
    })
})

let isDark = false

function toggleTheme() {
    isDark = !isDark

    const body = document.getElementById('body')
    const icon = document.getElementById('themeIcon')

    if(isDark) {
        body.classList.replace('bg-gray-50', 'bg-gray-900')
        body.classList.replace('text-gray-600', 'text-white')
        icon.classList.remove('fa-regular', 'fa-moon')
        icon.classList.add('fa-solid', 'fa-circle-half-stroke')

        document.querySelectorAll('.work').forEach( btn =>  {
            btn.classList.replace('bg-white', 'bg-gray-900')
            btn.classList.replace('text-black', 'text-white')
            btn.classList.replace('hover:bg-indigo-100', 'hover:bg-indigo-900')
        })

        document.querySelectorAll('.clt').forEach(clt => {
            clt.classList.replace('bg-white', 'bg-gray-800')
        })
    }
    else{
        body.classList.replace('bg-gray-900', 'bg-gray-50')
        body.classList.replace('text-white', 'text-gray-600')
        icon.classList.remove('fa-solid', 'fa-circle-half-stroke')
        icon.classList.add('fa-regular', 'fa-moon')

        document.querySelectorAll('.work').forEach( btn =>  {
            btn.classList.replace('bg-gray-900', 'bg-white')
            btn.classList.replace('text-white', 'text-gray-600')
            btn.classList.replace('hover:bg-indigo-900', 'hover:bg-indigo-100')
        })
        
        document.querySelectorAll('.clt').forEach(clt => {
            clt.classList.replace('bg-gray-800', 'bg-white')
        })
    }
}
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

function openDialog() {
    document.getElementById('addLink').classList.remove('hidden')
}
function closeDialog() {
    document.getElementById('addLink').classList.add('hidden')
}

const API = 'http://localhost:3000/api'
// const API = 'https://linkvault-1st-draft-backend.onrender.com/api'

const urlInput = document.getElementById('urlInput')
const nameInput = document.getElementById('nameInput')
const imageInput = document.getElementById('imageInput')

// blue button code
document.getElementById('scrapeBtn').addEventListener('click', async() => {
    const imagePreview = document.getElementById('imagePreview')
    const imageIcon = document.getElementById('imageIcon')
    const url = urlInput.value.trim()

    if(!url)
        return alert('Please enter url')

    // hum url ko send kr rhe h isliye method post use kia,
    // headers yaani ke extra info to humne buss btaya ke content-type ye rhega,
    // lastly backend sirf string ko smjhta h isliye json.stringify ka use krke hum jsno ko string me convert krenge.
    // { url: "https://google.com" }     // JS Object
    // ↓ JSON.stringify()
    // '{"url":"https://google.com"}'    // JSON String
    const res = await fetch(`${API}/links/shorten`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({url})
    })

    const data = await res.json()

    if(data.title){
        nameInput.value = data.title
    }

    if(data.image){
        imageInput.value = data.image

        imagePreview.src = data.image
        imagePreview.classList.remove('hidden')
        imageIcon.classList.add('hidden')
    }
})

// toggle for filters/groups
document.querySelectorAll('.filter-btn', '.group-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('bg-indigo-800')
        btn.classList.toggle('text-white')
        btn.classList.toggle('selected')
    })
})

// save button 
document.getElementById('saveBtn').addEventListener('click', async() => {
    const payload = {
        url: urlInput.value.trim(),
        name: nameInput.value.trim(),
        image: imageInput.value.trim(),
   


        // ... is used bcz querySelector nodelist bnata h joki array jaise dikhta h pr hota nhi h.. usko array bnane ke lie ... use kia kyuki hume map function ka use krna tha
        // map basically hr element pe kuch krne ke baad naya array bnata h
        // b => b.textConte., iska mtlb b(har ek btn) uske andr ke text ko trim kro
        filters: [...document.querySelectorAll('.filter-btn.selected')].map(b => b.textContent.trim()),
        groups: [...document.querySelectorAll('.group-btn.selected')].map(b => b.textContent.trim())
    }

    if(!payload.url || !payload.name)
        return alert('Enter URL or Name')

    await fetch(`${API}/links`, {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    closeDialog()
    loadLinks()
})

async function loadLinks() {
    const res = await fetch(`${API}/links/get`)
    const data = await res.json()
    const links = Array.isArray(data) ? data : (data.links || [])

    if (!Array.isArray(links)) {
    console.error("Invalid API response:", data)
    return
    }

    const grid = document.getElementById('collectionsGrid')

    grid.innerHTML = links.map(link => `
        <div class="clt bg-white rounded-2xl overflow-hidden shadow-sm transition">
        <img class="w-full h-44 object-cover" src='${link.image}'>
        <div class="p-4">
        <div class="flex justify-between items-center">
        <div>
        <h3 class="font-semibold text-xl">${link.name}</h3>
        <p class="mt-1 text-sm text-gray-400">${(link.filters || []).join(', ') || 'No Filter'}</p>
        </div>
        <a href="${link.url}" target="_blank" class="hover:text-indigo-600 text-lg">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        </div>
        </div>
        </div>
        `).join('')
}

loadLinks()


// image add
document.getElementById('imageInput').addEventListener('input', function() {
    const preview = document.getElementById('imagePreview')
    const icon = document.getElementById('imageIcon')

    if(this.value){
        preview.src = this.value
        preview.classList.remove('hidden')
        icon.classList.add('hidden')
    }
    else{
        preview.classList.add('hidden')
        icon.classList.remove('hidden')
    }
})

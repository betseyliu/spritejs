const paper = spritejs.Paper2D('#paper'),
      bglayer = paper.layer('bglayer', {handleEvent: false}),
      fglayer = paper.layer('fglayer'),
      Sprite = spritejs.Sprite,
      Label = spritejs.Label

const earthCfg = '/static/image/earth.plist.json'
const earthRes = '/static/image/earth.png'

paper.setResolution(1600, 1200) 

const loading = new Label('loading, please wait...')
loading.attr({
  anchor: [0.5, 0.5],
  pos: [800, 600],
  color: 'white',
  font: '32px Arial',
})

bglayer.appendChild(loading)

paper.preload(
  [earthRes, earthCfg],
  {
    id : 'tree1',
    src: '/static/image/tree1.png',
  },
  {
    id: 'tree2',
    src: '/static/image/tree2.png',
  }
).then(function() {
  bglayer.removeChild(loading)

  const bgsky = new Sprite()
  bgsky.attr({
    size: [1600, 1200],
    bgcolor: '#2b3649'
  })
  bglayer.appendChild(bgsky)

  const earth = new Sprite()
  earth.attr({
    anchor: [0.5, 0.5],
    pos: [800, 600],
    size: [237, 248],
    textures: [
      {
        src: 'earth_shadow1.png',
        rect: [0, -9, 237, 248],
        filter: {
          opacity: 0.5
        }
      },
      {
        src: 'earth_blue.png',
        rect: [0, 0, 231, 230],
      },
      {
        src: 'earth_shadow2.png',
      }
    ],
  })

  earth.animate([
    {rotate: 0},
    {rotate: 360},
  ], {
    duration: 15000,
    iterations: Infinity,
  })

  fglayer.appendChild(earth)

  const trees = []

  for(let i = 0; i < 8; i++){
    const tree = new Sprite()
    tree.attr({
      anchor: [0.5, 1],
      pos: [800, 600],
      textures: [
        `tree${i % 2 + 1}`
      ],
      rotate: i * 45,
    })
    tree.animate([
      {rotate: i * 45},
      {rotate: i * 45 + 360},
    ], {
      duration: 15000,
      iterations: Infinity,
    })
    trees.push(tree)
  }

  fglayer.append(...trees)
}).catch(function(err) {
  console.log('err',err)
})

window.addEventListener('resize', evt => {
  paper.setViewport('auto', 'auto')
})

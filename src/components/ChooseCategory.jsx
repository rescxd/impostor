import { categories } from '../gameConfig'

function ChooseCategory({ onSelect, onBack }) {
  const handleCategoryClick = (category) => {
    onSelect(category)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FF2D55] to-[#FF5C7C] flex items-center justify-center">
      <div className="w-full max-w-[500px] min-h-screen flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center text-white text-3xl hover:scale-110 active:scale-95 transition-all"
          >
            ←
          </button>
          <h1 className="text-4xl text-white font-bold tracking-tight">Kategorie</h1>
          <button className="w-12 h-12 flex items-center justify-center text-white text-2xl opacity-50">

          </button>
        </div>

        {/* Lista kategorii */}
        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide pb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="w-full bg-[#2a2a2a] rounded-2xl p-5 flex items-center gap-4 shadow-lg hover:bg-[#3a3a3a] active:scale-[0.98] transition-all transform hover:shadow-xl"
            >
              <div className="text-6xl flex-shrink-0">{category.emoji}</div>
              <div className="flex-1 text-left">
                <div className="text-white text-xl font-bold mb-1">{category.name}</div>
                <div className="text-gray-400 text-sm leading-snug">{category.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChooseCategory

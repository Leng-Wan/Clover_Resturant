export default function MealsList({meals, onAddToCart})
{
  return(
    <div>
      {meals.map(meal => (
      <div key={meal.id}>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} width="200"/>
        <h3>{meal.name}</h3>
        <h4>${meal.price}</h4>
        <p>{meal.description}</p>
        <button onClick={() => onAddToCart(meal)}>Add to Cart</button>
      </div>
      ))}
    </div>
    )
}
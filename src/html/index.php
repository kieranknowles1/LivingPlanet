<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="favicon.svg">
    <title>Living Planet</title>
</head>
<body>
    <h1>Living Planet</h1>
    <?php require 'components/navigation.php'; ?>
    <section>
        <h2>Current Moods</h2>
        <p>
            We bring to you a data visualization of a variety of moods across the city. We will be looking
            at what people are saying about food, drink, sleep and love in the City
        </p>

        <fieldset>
            <legend>Select a Mood</legend>
            <label>
                <input type="radio" name="mood" value="food">
                Food
            </label><br>
            <label>
                <input type="radio" name="mood" value="drink">
                Drink
            </label><br>
            <label>
                <input type="radio" name="mood" value="sleep">
                Sleep
            </label><br>
            <label>
                <input type="radio" name="mood" value="love">
                Love
            </label><br>
        </fieldset>
        <button type="submit">Submit</button>
    </section>
</body>
</html>

import pandas as pd

df = pd.read_csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv")
df.date = pd.to_datetime(df.date)
df = df.groupby([df.state, df.date]).sum().sort_index()[["cases", "deaths"]]
df["new_cases"] = df.cases - df.cases.shift(1)
df["new_cases_7day"] = df["new_cases"].rolling(7).mean()
df = df.iloc[df.reset_index().groupby('state')['date'].idxmax()]['new_cases_7day'].reset_index(level=1)
df.to_json(path_or_buf="./src/data/cases.json", orient='index', indent=2)

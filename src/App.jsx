import { useState, useRef, useEffect } from "react";
import "./App.css";

// ==========================================
// CURRICULUM DATA (all strings JSON-escaped)
// ==========================================
const CURRICULUM = [
  {
    id:"intro",
    icon:"Pd",
    title:"What is Pandas?",
    desc:"Your data superpowers start here",
    xpReward:30,
    chapter:1,
    subtopic:"",
    theory:[{title:"The Big Picture",content:"Pandas is Python's most powerful library for working with structured data. Load, explore, clean, transform and analyse data with just a few lines of code.",analogy:"Think of Pandas like Excel on steroids \u2014 commands that work on millions of rows in seconds.",},
      {title:"Why Pandas?",content:"Before Pandas, data scientists wrote tedious loops. Pandas introduced vectorised operations \u2014 a single command applies to every row simultaneously \u2014 10-100x faster.",},
      {title:"Two Core Objects",points:["Series \u2014 a single column of data (1D)","DataFrame \u2014 a full table with rows and columns (2D)"],},
      {title:"Real-World Connections",useCases:[{icon:"HC",title:"Healthcare",body:"Analyse patient records, track drug trials"},{icon:"FIN",title:"Finance",body:"Stock prices, portfolio returns, risk models"},{icon:"RET",title:"Retail",body:"Sales analysis, inventory tracking"},{icon:"SCI",title:"Science",body:"Experiment results, sensor data, genomics"}],}],
    code:"import pandas as pd\nimport numpy as np\n\nprint('Pandas version:', pd.__version__)\n\nseries_example = pd.Series([10, 20, 30, 40])\ndf_example = pd.DataFrame({\n    'name':  ['Alice', 'Bob', 'Carol'],\n    'score': [95, 87, 92]\n})\n\nprint('\\nA Series (1D):')\nprint(series_example)\n\nprint('\\nA DataFrame (2D):')\nprint(df_example)",
    purePython:null,
    quiz:[{q:"What is Pandas primarily used for?",opts:["Building web servers","Working with structured/tabular data","Creating 3D graphics","Writing system scripts"],correct:1,explain:"Pandas is Python's go-to library for data manipulation \u2014 loading, cleaning, transforming and analysing structured data."},
      {q:"Which is NOT a core Pandas data structure?",opts:["Series","DataFrame","Matrix","Index"],correct:2,explain:"Pandas has Series (1D) and DataFrame (2D). 'Matrix' is a NumPy concept, not a Pandas data structure."},
      {q:"Why is Pandas faster than Python for-loops?",opts:["Uses multiple CPUs","Vectorised via NumPy C code","Stores data in a database","Compresses data"],correct:1,explain:"Pandas delegates to NumPy which runs optimised C code. A loop processes one element at a time; vectorised ops process all elements simultaneously."}],
    openChallenges:[{q:"Create a Series of 5 cities in Assam and print it.",hint:"pd.Series([...]) with a list of city names.",solution:"import pandas as pd\n\ncities = pd.Series([\n    'Guwahati', 'Silchar',\n    'Dibrugarh', 'Tezpur', 'Jorhat'\n])\nprint(cities)"},
      {q:"Create a DataFrame with columns 'student', 'marks', 'subject' for 3 students. Print it and its shape.",hint:"pd.DataFrame({...}) then df.shape \u2014 no parentheses!",solution:"import pandas as pd\n\ndf = pd.DataFrame({\n    'student': ['Riya','Arjun','Priya'],\n    'marks':   [88, 75, 91],\n    'subject': ['Math','Science','English']\n})\nprint(df)\nprint('Shape:', df.shape)"}],
    experiments:[{title:"Exp 1: Series Arithmetic",desc:"Enter a multiplier. Watch it apply to every value \u2014 no loop needed.",inputs:[{id:"mult",label:"Multiply by",val:"2",type:"number",w:"60px"}],runId:"intro_mult"}],
    mistakes:[{title:"Forgetting to import Pandas",wrong:"print(pd.__version__)  # NameError!",fix:"import pandas as pd\nprint(pd.__version__)  # always import first",why:"Pandas is not in the standard library. <code>import pandas as pd</code> must appear at the top of every file. The alias <code>pd</code> is a universal convention."}],
  },
  {
    id:"series",
    icon:"[S]",
    title:"Series Deep Dive",
    desc:"The 1D powerhouse behind every DataFrame column",
    xpReward:50,
    chapter:1,
    subtopic:"",
    theory:[{title:"What is a Series?",content:"A one-dimensional labelled array. Every value has an associated index label. Supports vectorised operations, NaN handling, and index alignment.",analogy:"A roll-call sheet: left side is the roll number (index), right side is the value.",},
      {title:"Anatomy of a Series",points:["Values \u2014 the data (NumPy array internally)","Index \u2014 labels (default: 0,1,2,...)","Name \u2014 optional identifier (becomes column header in DataFrame)"],},
      {title:"Index Alignment",content:"When you add two Series, Pandas aligns by INDEX label, not position. Unmatched labels become NaN. This is fundamentally different from list addition!",analogy:"Like adding two balance sheets \u2014 matches by account name. Missing accounts get NaN.",},
      {title:"Use Cases",useCases:[{icon:"TMP",title:"Temperature",body:"Daily max temps with dates as index"},{icon:"STK",title:"Stock Prices",body:"Daily closing prices of one stock"},{icon:"SRV",title:"Survey",body:"Ratings from respondents, indexed by ID"},{icon:"ML",title:"ML Feature",body:"A single feature column across training samples"}],}],
    code:"import pandas as pd\nimport numpy as np\n\n# From a list\nages = pd.Series([34, 18, 42, 66], name='Age')\nprint('From list:')\nprint(ages)\n\n# From a dict (keys = index!)\nscores = pd.Series({'Alice':95,'Bob':87,'Carol':92}, name='Score')\nprint('\\nFrom dict:')\nprint(scores)\n\n# Key attributes\nprint('\\nvalues:', ages.values)\nprint('index :', ages.index.tolist())\nprint('dtype :', ages.dtype)\nprint('shape :', ages.shape)\n\n# Index alignment\ns1 = pd.Series([10,20], index=['a','b'])\ns2 = pd.Series([100,200], index=['b','c'])\nprint('\\ns1 + s2 (alignment):')\nprint(s1 + s2)",
    purePython:null,
    quiz:[{q:"pd.Series({'a':1,'b':2,'c':3}) \u2014 what becomes the index?",opts:["0,1,2 (integers)","a,b,c (dict keys)","1,2,3 (values)","Random"],correct:1,explain:"When creating a Series from a dictionary, keys become index labels and values become the data."},
      {q:"s = pd.Series([10,20,30]); print(s.shape) outputs:",opts:["(3,1)","[3]","(3,)","3"],correct:2,explain:"A Series is 1D, so shape is a single-element tuple (n,). NOT (n,1) which would imply 2D."},
      {q:"s1=['a','b','c'] s2=['b','c','d'] \u2014 s1+s2: what at index 'a' and 'd'?",opts:["0 and 0","Error","NaN and NaN","1 and the value"],correct:2,explain:"Pandas aligns by index. 'a' only exists in s1, 'd' only in s2 \u2014 both become NaN because there's nothing to add them to."}],
    openChallenges:[{q:"Create a Series of monthly rainfall (mm) for Jan-Jun in Guwahati. Set months as index. Find max and min rainfall months.",hint:"pd.Series(data, index=[...]) then s.idxmax() and s.idxmin()",solution:"s = pd.Series(\n    [12,18,45,120,280,380],\n    index=['Jan','Feb','Mar','Apr','May','Jun'],\n    name='Rainfall_mm'\n)\nprint(s)\nprint('Max:', s.idxmax(), '->', s.max(), 'mm')\nprint('Min:', s.idxmin(), '->', s.min(), 'mm')"},
      {q:"Create two Series with names as index. Add them. What happens to shared/unshared indices? How do you fill NaN with 0?",hint:"s1+s2 gives NaN for unmatched. Try s1.add(s2, fill_value=0)",solution:"s1 = pd.Series({'Alice':85,'Bob':90,'Carol':78})\ns2 = pd.Series({'Bob':92,'Carol':88,'Dave':95})\nprint(s1 + s2)  # NaN for Alice and Dave\nprint(s1.add(s2, fill_value=0))  # 0 for missing"}],
    experiments:[{title:"Exp 1: Index Alignment",desc:"Two Series with overlapping indices. See how addition aligns by label.",inputs:[{id:"s1vals",label:"S1 (a,b,c)",val:"10,20,30",type:"text",w:"110px"},{id:"s2vals",label:"S2 (b,c,d)",val:"100,200,300",type:"text",w:"110px"}],runId:"series_align"}],
    mistakes:[{title:"shape() with parentheses",wrong:"s.shape()  # TypeError: 'tuple' object is not callable",fix:"s.shape    # No parentheses \u2014 it is a property",why:"<code>shape</code>, <code>dtype</code>, <code>name</code>, <code>values</code> are attributes (stored properties). Methods like <code>sum()</code> do something. Rule: noun = attribute (no parens), verb = method (parens)."},
      {title:"Index/data length mismatch",wrong:"pd.Series([1,2,3], index=['a','b'])  # ValueError!",fix:"pd.Series([1,2,3], index=['a','b','c'])  # lengths must match",why:"The index list must exactly match the data length. Use <code>np.nan</code> as a placeholder if needed."}],
  },
  {
    id:"dataframe",
    icon:"[D]",
    title:"DataFrame Deep Dive",
    desc:"The 2D table that powers all data analysis",
    xpReward:50,
    chapter:1,
    subtopic:"",
    theory:[{title:"What is a DataFrame?",content:"A 2D labelled table. Every column is a Series. All columns share the same index. Columns can have different dtypes.",analogy:"A school register: each row is a student (index), each column is an attribute. Each column is a Series.",},
      {title:"Essential Attributes",points:["df.shape -> (rows, cols) \u2014 NO parentheses!","df.columns -> column names","df.index -> row labels","df.dtypes -> type of each column","df.info() -> nulls + memory","df.describe() -> statistics","df.head(n) / df.tail(n) -> first/last n rows"],},
      {title:"Use Cases",useCases:[{icon:"SCH",title:"School Records",body:"Name, marks, grade, attendance"},{icon:"ECO",title:"E-commerce",body:"Product ID, price, stock, category"},{icon:"PAT",title:"Patient Data",body:"Patient ID, diagnosis, age, blood type"},{icon:"GEO",title:"Country Stats",body:"GDP, population, HDI, region"}],}],
    code:"import pandas as pd\n\ndata = {\n    'first_name': ['Jane','John','Corey','Marie'],\n    'last_name':  ['Doe','Smith','Schafer','Curie'],\n    'email':      ['jane@email.com','john@email.com',\n                   'corey@email.com','marie@email.com'],\n    'age':        [34, 18, 42, 66]\n}\ndf = pd.DataFrame(data)\n\nprint(df)\nprint('\\nShape:', df.shape)\nprint('Columns:', df.columns.tolist())\nprint('\\ndtypes:')\nprint(df.dtypes)\nprint('\\ndescribe():')\nprint(df.describe())",
    purePython:null,
    quiz:[{q:"df.shape for 100 rows, 5 columns returns:",opts:["[100,5]","(100,5)","100 x 5","{rows:100}"],correct:1,explain:"df.shape returns a tuple (rows, cols). It is a property \u2014 no () needed."},
      {q:"Every column in a DataFrame is actually a:",opts:["List","NumPy array","Series","Dictionary"],correct:2,explain:"A DataFrame is a collection of Series sharing the same index. df['column'] returns a Series."},
      {q:"Which shows the LAST 3 rows?",opts:["df.tail()","df.tail(3)","df.last(3)","df.bottom(3)"],correct:1,explain:"df.tail(n) returns last n rows. df.tail() defaults to 5. There is no df.last() or df.bottom()."}],
    openChallenges:[{q:"Build a cricket team DataFrame: player name, runs, wickets, matches (5+ players). Print df.describe() and explain what mean/std tell you.",hint:"pd.DataFrame({...}). describe() shows count, mean, std, min, quartiles, max.",solution:"df = pd.DataFrame({\n    'player':  ['Rohit','Virat','Bumrah','Dhoni','Jadeja'],\n    'runs':    [2345,3120,45,1890,980],\n    'wickets': [2,1,87,0,52],\n    'matches': [80,95,60,75,88]\n})\nprint(df.describe())\n# Low std = consistent, high std = variable"},
      {q:"df.shape returns (0,5). What does this mean? List 3 ways it can happen.",hint:"0 rows, 5 columns = empty but structured.",solution:"# Cause 1: filter that matches nothing\ndf[df['age'] > 200]  # (0, cols)\n\n# Cause 2: empty lists\npd.DataFrame({'a':[],'b':[],...})\n\n# Cause 3: CSV with only header row"}],
    experiments:[{title:"Exp 1: Column Extraction",desc:"Type a column name to extract it as a Series.",inputs:[{id:"col",label:"Column",val:"age",type:"text",w:"130px"}],runId:"df_col"}],
    mistakes:[{title:"df.shape() \u2014 most common mistake",wrong:"print(df.shape())  # TypeError: 'tuple' object is not callable",fix:"print(df.shape)    # no parentheses",why:"<code>shape</code> stores a tuple. Adding <code>()</code> tries to call the tuple as a function. Rule: <code>describe()</code>, <code>info()</code>, <code>head()</code> are methods. <code>shape</code>, <code>dtype</code>, <code>columns</code> are attributes."},
      {title:"Columns of unequal length",wrong:"pd.DataFrame({'a':[1,2,3],'b':[4,5]})  # ValueError!",fix:"pd.DataFrame({'a':[1,2,3],'b':[4,5,None]})  # use None",why:"All columns must have the same length. Use <code>None</code> or <code>np.nan</code> as explicit missing value placeholders."}],
  },
  {
    id:"index",
    icon:"[I]",
    title:"Indexing and Selection",
    desc:".loc (label) vs .iloc (position) \u2014 master both",
    xpReward:60,
    chapter:1,
    subtopic:"",
    theory:[{title:"The Index Object",content:"The Index is Pandas' row-labelling system. Default is RangeIndex (0,1,2...) but can be set to emails, dates, IDs. Enables O(1) row lookups.",analogy:"A library catalogue \u2014 without it you walk every shelf. With a catalogue number you jump directly to the book.",},
      {title:".loc \u2014 Label-Based",content:".loc uses the actual label. Once email is the index, df.loc['jane@email.com'] jumps to Jane's row. INCLUSIVE endpoint: df.loc[0:2] returns rows 0, 1, AND 2.",},
      {title:".iloc \u2014 Position-Based",content:".iloc uses the integer position (0,1,2...). Exclusive endpoint like Python lists. df.iloc[2:5] returns positions 2,3,4. Never affected by index labels.",},
      {title:"Boolean Masking",content:"df[df['age']>30] is a boolean mask. The inner expression makes True/False. Only True rows are returned. It is SQL's WHERE clause.",points:["df[df['col']==value]","df[df['col']>value]","df[(df['col']>a) & (df['col']<b)]  -- use & not 'and'","df[df['col'].isin(['x','y'])]"],},
      {title:"Use Cases",useCases:[{icon:"DATE",title:"Time Series",body:"Dates as index -> df.loc['2024-01-15']"},{icon:"ID",title:"Primary Keys",body:"Customer ID as index for fast lookup"},{icon:"GEO",title:"Geographic",body:"Country code -> df.loc['IND']"},{icon:"AUTH",title:"User Auth",body:"Email as index for login systems"}],}],
    code:"import pandas as pd\n\ndata = {\n    'first_name': ['Jane','John','Corey','Marie'],\n    'last_name':  ['Doe','Smith','Schafer','Curie'],\n    'email':      ['jane@email.com','john@email.com',\n                   'corey@email.com','marie@email.com'],\n    'age':        [34, 18, 42, 66]\n}\ndf = pd.DataFrame(data)\n\n# Set email as index\ndf.set_index('email', inplace=True)\nprint('After set_index:')\nprint(df)\n\n# .loc \u2014 label lookup\nprint('\\n.loc by label:')\nprint(df.loc['jane@email.com'])\n\n# .iloc \u2014 position lookup\nprint('\\n.iloc[1] \u2014 2nd row by position:')\nprint(df.iloc[1])\n\n# Boolean mask\nprint('\\nAge > 30:')\nprint(df[df['age'] > 30])\n\n# Safe modification\ndf.loc[df['age'] < 20, 'age'] = 21\nprint('\\nAfter fixing age < 20:')\nprint(df['age'])",
    purePython:null,
    quiz:[{q:"After df.set_index('email'), df.loc[0] does what?",opts:["Returns first row","Returns position 0","Raises KeyError","Returns NaN"],correct:2,explain:"Once index is emails (strings), integer 0 is not a valid label. .loc searches by label. Use .iloc[0] for the first row by position."},
      {q:"df.loc[2:5] vs df.iloc[2:5] \u2014 key difference?",opts:["They are identical","loc returns 2,3,4,5 (inclusive); iloc returns 2,3,4 (exclusive)","iloc returns 2,3,4,5; loc returns 2,3,4","Both return 3 rows"],correct:1,explain:".loc slicing is label-inclusive \u2014 includes row 5. .iloc follows Python \u2014 excludes position 5. A common off-by-one bug source."},
      {q:"Safe way to update a filtered value?",opts:["df[df['age']==18]['age']=20","df.age[0]=20","df.loc[df['age']==18,'age']=20","df.set_value(0,'age',20)"],correct:2,explain:"Always use df.loc[row_filter, column] = value. Chained indexing may modify a copy, not the original (SettingWithCopyWarning)."},
      {q:"Filter: age > 20 AND age < 50. Which is correct?",opts:["df[df['age']>20 and df['age']<50]","df[df['age']>20 & df['age']<50]","df[(df['age']>20) & (df['age']<50)]","All are correct"],correct:2,explain:"Each condition needs parentheses. & joins them (not 'and'). Without parens, operator precedence gives wrong results silently."}],
    openChallenges:[{q:"Set 'email' as index. Update Corey's age to 43 with .loc. Then extract everyone with age < 44.",hint:"df.loc['corey@email.com','age'] = 43 then df[df['age']<44]",solution:"df.set_index('email', inplace=True)\ndf.loc['corey@email.com','age'] = 43\nprint(df[df['age'] < 44])"},
      {q:"Filter age between 20 and 50 (inclusive) using BOTH boolean mask AND df.query(). Which is more readable?",hint:"Mask: (df['age']>=20) & (df['age']<=50). Query: df.query('20 <= age <= 50')",solution:"# Boolean mask\nmask = (df['age'] >= 20) & (df['age'] <= 50)\nprint(df[mask])\n\n# query() -- more readable!\nprint(df.query('20 <= age <= 50'))"}],
    experiments:[{title:"Exp 1: loc vs iloc",desc:"Pick a row number. See it by position (iloc) and by label (loc).",inputs:[{id:"pos",label:"Row pos (0-3)",val:"0",type:"number",w:"60px"}],runId:"index_lociloc"},
      {title:"Exp 2: Boolean Mask Filter",desc:"Set a minimum age. See which rows match.",inputs:[{id:"min_age",label:"Min age",val:"30",type:"number",w:"60px"}],runId:"index_mask"}],
    mistakes:[{title:"SettingWithCopyWarning",wrong:"df[df['age']==18]['age'] = 20  # change may not apply!",fix:"df.loc[df['age']==18, 'age'] = 20  # safe and correct",why:"Chained indexing may create a copy. Modifying a copy does nothing to the original. Always use <code>.loc[row_filter, column]</code> for modifications."},
      {title:".loc endpoint is inclusive",wrong:"df.loc[0:2]  # 3 rows: 0,1,2 -- NOT 2 rows!",fix:"df.iloc[0:2]  # 2 rows: 0,1 (Python-style exclusive)",why:"<code>.loc</code> label slicing includes the stop value. <code>.iloc</code> uses Python-standard exclusive stop."}],
  },
  {
    id:"multiindex",
    icon:"[M]",
    title:"MultiIndex \u2014 Hierarchical Data",
    desc:"Two-level indexing for nested datasets",
    xpReward:60,
    chapter:1,
    subtopic:"",
    theory:[{title:"What is a MultiIndex?",content:"Gives each row multiple label levels. Each row identified by a tuple: e.g., ('India','Maharashtra'). Outer level groups; inner level identifies within group.",analogy:"A filing cabinet: outer drawers = Year, inner files = Month. To find: open year drawer, then find month. That is (Year, Month) MultiIndex.",},
      {title:"Slicing MultiIndex",points:["df.loc['Smith'] -> all rows where outer index = 'Smith'","df.loc[('Smith','John')] -> exact tuple match","df.loc[(slice(None),'John'),:] -> inner level, any outer","df.xs('John', level='first_name') -> clean cross-section"],},
      {title:"Always Sort Before Slicing",content:"Range slicing on MultiIndex REQUIRES the index to be sorted. Call df.sort_index() right after building a MultiIndex.",},
      {title:"Use Cases",useCases:[{icon:"STK",title:"Stock Data",body:"(Ticker, Date) -> AAPL on 2024-01-15"},{icon:"RET",title:"Retail",body:"(Region, Store) -> North branch sales"},{icon:"WX",title:"Weather",body:"(City, Year, Month) -> 3-level hierarchy"},{icon:"EDU",title:"Exams",body:"(Subject, Class) -> Math scores for Class 10"}],}],
    code:"import pandas as pd\n\ndata = {\n    'first_name': ['Jane','John','Corey','Marie'],\n    'last_name':  ['Doe','Smith','Schafer','Curie'],\n    'email':      ['jane@email.com','john@email.com',\n                   'corey@email.com','marie@email.com'],\n    'age':        [34, 18, 42, 66]\n}\ndf = pd.DataFrame(data)\n\n# Build 2-level MultiIndex\ndf.set_index(['last_name','first_name'], inplace=True)\nprint('MultiIndex DataFrame:')\nprint(df)\nprint('\\nIndex levels:', df.index.names)\n\n# Partial slice \u2014 outer level\nprint('\\nAll Smith rows:')\nprint(df.loc['Smith'])\n\n# Full tuple\nprint('\\nExact (Schafer, Corey):')\nprint(df.loc[('Schafer','Corey')])\n\n# Cross-section on inner level\nprint('\\nxs on first_name=Jane:')\nprint(df.xs('Jane', level='first_name'))",
    purePython:null,
    quiz:[{q:"MultiIndex on (last_name, first_name). df.loc['Doe'] returns:",opts:["KeyError","Only Marie Curie","All rows where last_name='Doe' (Jane)","All rows"],correct:2,explain:".loc with one label on a MultiIndex matches the outermost level. 'Doe' is Jane's last_name."},
      {q:"df.loc['John'] raises KeyError. Why?",opts:["John not in data","John is in INNER level (first_name), not outer (last_name)","Index unsorted","Need iloc"],correct:1,explain:".loc always searches outermost level first. 'John' is first_name (inner). Use df.xs('John', level='first_name')."},
      {q:"Before range slicing a MultiIndex you must call:",opts:["df.reset_index()","df.sort_index()","df.reindex()","df.stack()"],correct:1,explain:"Range slicing needs the index lexicographically sorted. Pandas uses binary search internally."}],
    openChallenges:[{q:"Create a cricket DataFrame: team, match_type (Test/ODI/T20), runs. Set MultiIndex on (team, match_type). Get all ODI results for India.",hint:"df.set_index(['team','match_type'], inplace=True) then df.loc[('India','ODI')]",solution:"df.set_index(['team','match_type'], inplace=True)\ndf.sort_index(inplace=True)\nprint(df.loc['India'])  # all formats\nprint(df.loc[('India','ODI')])  # ODIs only"},
      {q:"Using df.xs(), retrieve all 'Test' matches across ALL teams. What advantage does xs() have over loc with slice(None)?",hint:"df.xs('Test', level='match_type') vs df.loc[(slice(None),'Test'),:]",solution:"# xs() -- clean\ndf.xs('Test', level='match_type')\n# loc equivalent -- verbose\ndf.loc[(slice(None), 'Test'), :]"}],
    experiments:[{title:"Exp 1: Outer Level Lookup",desc:"Enter a last name to see partial slicing.",inputs:[{id:"lname",label:"Last name",val:"Smith",type:"text",w:"110px"}],runId:"multi_outer"}],
    mistakes:[{title:"Accessing inner level with .loc",wrong:"df.loc['John']   # KeyError! John is inner level",fix:"df.loc['Smith']                    # outer level\ndf.xs('John', level='first_name')  # inner level",why:"<code>.loc[]</code> searches the outermost level first. Use <code>df.xs(value, level=level_name)</code> for inner-level access."},
      {title:"Range slicing unsorted MultiIndex",wrong:"df.loc['Curie':'Smith']  # PerformanceWarning + wrong!",fix:"df.sort_index(inplace=True)\ndf.loc['Curie':'Smith']  # correct",why:"Unsorted MultiIndex range slices trigger <code>PerformanceWarning</code> and may return incorrect results."}],
  },
  {
    id:"csv_tsv",
    icon:"CSV",
    title:"Reading and Writing CSV/TSV",
    desc:"The most common data format in the wild",
    xpReward:55,
    chapter:2,
    subtopic:"2.1 Flat Files",
    theory:[{title:"Why CSV?",content:"CSV is the universal language of data exchange. Every database, Excel sheet, and data portal can export CSV. Plain text \u2014 no proprietary format.",analogy:"CSV is like plain-text email \u2014 no fancy formatting, just raw information. Everyone can open it.",},
      {title:"read_csv key parameters",points:["sep / delimiter \u2014 separator char (default ','). TSV uses sep='\\t'","header \u2014 row to use as column names (default 0)","names=['a','b'] \u2014 supply column names manually","index_col='id' \u2014 use a column as row index","skiprows=2 \u2014 skip first 2 rows","skipfooter=3 \u2014 skip last 3 rows (needs engine='python')","nrows=100 \u2014 read only first 100 rows","usecols=['a','b'] \u2014 load specific columns only","dtype={'age':int} \u2014 enforce column types","na_values=['N/A','--'] \u2014 extra strings to treat as NaN","encoding='utf-8' \u2014 file encoding (try latin-1 if utf-8 fails)"],},
      {title:"to_csv parameters",points:["index=False \u2014 ALWAYS use this unless index is meaningful","sep='|' \u2014 pipe-delimited for data with commas","columns=['a','b'] \u2014 write specific columns only","na_rep='NULL' \u2014 represent NaN in output","float_format='%.2f' \u2014 decimal precision"],},
      {title:"Use Cases",useCases:[{icon:"BANK",title:"Bank Statements",body:"Export transactions as CSV, skiprows=5 to skip bank header"},{icon:"GOV",title:"Govt Data Portals",body:"data.gov.in exports \u2014 index_col='State', usecols for relevant columns"},{icon:"XLS",title:"Excel to CSV",body:"Excel saved as CSV for automated monthly reporting"},{icon:"IOT",title:"Sensor Logs",body:"IoT TSV logs \u2014 sep='\\t', skiprows=1"}],}],
    code:"import pandas as pd\n\n# Basic read\ndf = pd.read_csv('students.csv')\nprint(df.head())\n\n# TSV\ndf_tsv = pd.read_csv('data.tsv', sep='\\t')\n\n# Skip rows, custom names\ndf_skip = pd.read_csv(\n    'messy.csv',\n    skiprows=3,\n    names=['id','name','score','grade'],\n    skipfooter=2,\n    engine='python'\n)\n\n# Set index column\ndf_idx = pd.read_csv('students.csv', index_col='student_id')\n\n# Load only what you need\ndf_small = pd.read_csv(\n    'students.csv',\n    usecols=['name','grade'],\n    nrows=50\n)\nprint(f'Shape: {df_small.shape}')\n\n# Write without index\ndf.to_csv('output.csv', index=False)  # clean\ndf.to_csv('output.csv', index=True)   # adds extra column!\n\n# Pipe-delimited\ndf.to_csv('output.psv', sep='|', index=False)",
    purePython:{title:"Reading CSV without Pandas",comparisons:[{task:"Read a CSV and get rows as dicts",pyCode:"import csv\n\nrows = []\nwith open('students.csv', 'r') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        rows.append(dict(row))\n\n# Values are ALL STRINGS!\nover80 = [r for r in rows\n          if int(r['score']) > 80]  # must cast!",pdCode:"import pandas as pd\n\ndf = pd.read_csv('students.csv')\n\n# dtypes auto-inferred!\nover80 = df[df['score'] > 80]",verdict:"csv.DictReader gives strings \u2014 you manually cast every column. Pandas infers dtypes. 5-line filter replaces 8+ lines.",saved:"~60% fewer lines"},
        {task:"Skip header rows and rename columns",pyCode:"import csv\n\nwith open('messy.csv', 'r') as f:\n    for _ in range(3):\n        next(f)  # skip manually\n    reader = csv.reader(f)\n    headers = ['id','name','score','grade']\n    rows = [dict(zip(headers, row))\n            for row in reader]",pdCode:"df = pd.read_csv(\n    'messy.csv',\n    skiprows=3,\n    names=['id','name',\n           'score','grade']\n)",verdict:"Pure Python requires manual file seek, manual header binding with zip(), manual dict construction. Pandas does it with two keyword arguments.",saved:"~75% fewer lines"}]},
    quiz:[{q:"Which parameter uses a column as the row index at read time?",opts:["set_index=","index_col=","row_label=","primary_key="],correct:1,explain:"index_col='column_name' promotes that column to the DataFrame index at read time. No separate df.set_index() needed."},
      {q:"You see an extra unnamed column '0,1,2...' in your CSV output. What caused it?",opts:["CSV was corrupted","df.to_csv() without index=False","skiprows incorrect","No header row"],correct:1,explain:"to_csv() defaults to index=True, writing the row index as the first column. Always use index=False to suppress it."},
      {q:"A CSV has 3 metadata rows before the actual headers. Which parameter skips them?",opts:["header=3","skiprows=3","skip_header=3","start_row=3"],correct:1,explain:"skiprows=3 skips the first 3 rows. header=3 would use row index 3 as the column header row \u2014 different behavior."},
      {q:"TSV equivalent of pd.read_csv('file.csv') is:",opts:["pd.read_tsv('file.tsv')","pd.read_csv('file.tsv', sep='\\t')","pd.read_csv('file.tsv', delimiter='tab')","pd.read_table('file.tsv')"],correct:1,explain:"TSV uses tab as delimiter. Use sep='\\t' in read_csv. pd.read_table() also exists (defaults to tab) but read_csv with sep='\\t' is more explicit."}],
    openChallenges:[{q:"A govt CSV has 4 rows of metadata, headers on row 5, data from row 6. Load it correctly, rename all columns to lowercase with underscores, print df.info().",hint:"skiprows=4. Then df.columns = df.columns.str.lower().str.replace(' ','_')",solution:"df = pd.read_csv('govt_data.csv', skiprows=4)\ndf.columns = df.columns.str.lower().str.replace(' ','_').str.strip()\nprint(df.info())"},
      {q:"Write a function read_any(filepath) that auto-detects CSV vs TSV by extension and reads correctly.",hint:"filepath.endswith('.tsv') to check. Use sep='\\t' for TSV.",solution:"def read_any(filepath):\n    if filepath.endswith('.tsv'):\n        return pd.read_csv(filepath, sep='\\t')\n    return pd.read_csv(filepath)\n\ndf1 = read_any('students.csv')\ndf2 = read_any('sensors.tsv')"}],
    experiments:[{title:"Exp 1: usecols impact",desc:"Choose columns to load. See how shape changes.",inputs:[{id:"cols",label:"Columns (comma-sep)",val:"name,score",type:"text",w:"180px"}],runId:"csv_usecols"},
      {title:"Exp 2: sep= explorer",desc:"Change separator. See how the same data parses differently.",inputs:[{id:"sep",label:"Separator",val:",",type:"text",w:"50px"}],runId:"csv_sep"}],
    mistakes:[{title:"index=True in to_csv",wrong:"df.to_csv('out.csv')  # index=True by default!\n# Re-reading gives: Unnamed: 0 column",fix:"df.to_csv('out.csv', index=False)  # always unless index is data",why:"Default for <code>to_csv()</code> is <code>index=True</code>. When re-read, you get a mysterious <code>Unnamed: 0</code> column. Always set <code>index=False</code>."},
      {title:"UnicodeDecodeError on non-UTF-8 files",wrong:"pd.read_csv('govt_data.csv')  # UnicodeDecodeError!",fix:"pd.read_csv('govt_data.csv', encoding='latin-1')\n# or encoding='cp1252' for Windows files",why:"Many legacy CSV files use Latin-1 or Windows-1252. Try <code>encoding='latin-1'</code> first. Use <code>chardet</code> library to detect encoding."}],
  },
  {
    id:"advanced_formats",
    icon:"FMT",
    title:"Advanced File Formats",
    desc:"Excel, JSON, HTML, and binary formats",
    xpReward:65,
    chapter:2,
    subtopic:"2.2 Advanced Formats",
    theory:[{title:"Beyond CSV",content:"CSV has no dtypes, no multi-sheet support, no compression, and is slow for large data. Each alternative solves a specific problem.",analogy:"CSV is plain text. Excel is a formatted Word doc. Parquet is a compressed zip optimised for databases.",},
      {title:"Excel (xlsx/xls)",points:["pd.read_excel('file.xlsx') \u2014 reads first sheet by default","sheet_name='Sheet2' \u2014 specify by name or index","sheet_name=None \u2014 returns dict of ALL sheets","df.to_excel('out.xlsx', sheet_name='Results', index=False)","ExcelWriter \u2014 write multiple DataFrames to one file"],},
      {title:"JSON",points:["pd.read_json('data.json') \u2014 files AND URLs!","orient='records' \u2014 [{col:val,...},...] \u2014 most common","orient='columns' \u2014 {col:[val,...]} \u2014 DataFrame's internal layout","orient='index' \u2014 {idx:{col:val}}","orient='split' \u2014 {index:[...],columns:[...],data:[[...]]} \u2014 compact","df.to_json(orient='records', indent=2) \u2014 pretty output"],},
      {title:"Binary Formats",useCases:[{icon:"PKL",title:"Pickle (.pkl)",body:"Preserves all Python types. Fast. NOT portable across versions or untrusted sources."},{icon:"FTH",title:"Feather (.feather)",body:"Extremely fast read/write. Columnar. Designed for Python-R exchange."},{icon:"PQ",title:"Parquet (.parquet)",body:"Industry standard. Columnar, compressed, supports column pruning. Best for large data."},{icon:"HDF",title:"HDF5 (.h5)",body:"Hierarchical \u2014 multiple DataFrames per file. Good for time-series."}],}],
    code:"import pandas as pd\n\n# EXCEL\ndf = pd.read_excel('scores.xlsx', sheet_name='Exam1')\n\n# Read ALL sheets\nall_sheets = pd.read_excel('scores.xlsx', sheet_name=None)\nprint('Sheets:', list(all_sheets.keys()))\n\n# Write multiple sheets\nwith pd.ExcelWriter('results.xlsx') as writer:\n    df.to_excel(writer, sheet_name='Exam1', index=False)\n\n# JSON\ndf_json = pd.read_json('students.json', orient='records')\ndf.to_json('out.json', orient='records', indent=2)\n\n# Read from URL directly!\ndf_live = pd.read_json('https://api.example.com/data')\n\n# HTML scraping\ntables = pd.read_html('https://en.wikipedia.org/wiki/India')\nprint(f'Found {len(tables)} tables')\n\n# Parquet\ndf.to_parquet('data.parquet', compression='snappy')\ndf_pq = pd.read_parquet('data.parquet',\n                        columns=['name','score'])  # column pruning!\n\n# Feather\ndf.to_feather('data.feather')\ndf_fast = pd.read_feather('data.feather')",
    purePython:{title:"Parsing JSON and Excel without Pandas",comparisons:[{task:"Load a JSON array into a table structure",pyCode:"import json\n\nwith open('students.json') as f:\n    data = json.load(f)\n# data = [{'name':'Riya','score':92},...]\n\n# Extract column manually\nscores = [row['score'] for row in data]\n\n# Average\navg = sum(scores) / len(scores)\nprint(f'Average: {avg:.1f}')",pdCode:"import pandas as pd\n\ndf = pd.read_json(\n    'students.json',\n    orient='records'\n)\nprint(f'Average: {df[\"score\"].mean():.1f}')",verdict:"json module gives a list of dicts \u2014 no column ops, no vectorised math, manual aggregation. Pandas turns JSON into a queryable table in one line.",saved:"~65% fewer lines"},
        {task:"Read an Excel file",pyCode:"import openpyxl\n\nwb = openpyxl.load_workbook('scores.xlsx')\nws = wb['Exam1']\nrows = list(ws.values)\nheaders = rows[0]\ndata = []\nfor row in rows[1:]:\n    data.append(dict(zip(headers, row)))\n# Still a list of dicts!",pdCode:"import pandas as pd\n\ndf = pd.read_excel(\n    'scores.xlsx',\n    sheet_name='Exam1'\n)\n# Full DataFrame, dtypes inferred",verdict:"Without Pandas you use openpyxl directly (which Pandas uses internally) and end up with a list of dicts. Pandas wraps all that in one call.",saved:"~80% fewer lines"}]},
    quiz:[{q:"pd.read_excel('f.xlsx', sheet_name=None) returns:",opts:["First sheet as DataFrame","List of DataFrames","Dict where keys=sheet names, values=DataFrames","Error"],correct:2,explain:"sheet_name=None reads ALL sheets and returns an OrderedDict: key=sheet name, value=DataFrame."},
      {q:"Which JSON orient produces [{col:val,...},{col:val,...}]?",opts:["orient='columns'","orient='records'","orient='index'","orient='split'"],correct:1,explain:"orient='records' \u2014 a list of dicts, one dict per row. This is what most REST APIs return."},
      {q:"pd.read_html() returns:",opts:["A single DataFrame","A list of DataFrames","A dict of DataFrames","An HTML string"],correct:1,explain:"read_html() finds ALL table elements on the page and returns them as a list of DataFrames. Pick the right one by index."},
      {q:"Best format for large production datasets?",opts:["CSV","Pickle","Parquet","HDF5"],correct:2,explain:"Parquet: columnar (column pruning), ~80% smaller than CSV, cross-language, industry standard for big data."}],
    openChallenges:[{q:"Write smart_read_json(filepath) that auto-detects JSON orient and returns a clean DataFrame.",hint:"isinstance(raw, list) -> records. isinstance(raw, dict) with 'data' key -> split.",solution:"def smart_read_json(filepath):\n    import json, pandas as pd\n    with open(filepath) as f:\n        raw = json.load(f)\n    if isinstance(raw, list):\n        return pd.read_json(filepath, orient='records')\n    elif 'data' in raw:\n        return pd.read_json(filepath, orient='split')\n    return pd.read_json(filepath, orient='columns')"},
      {q:"Scrape Indian states from Wikipedia with pd.read_html(). Find the states+populations table. Save as Parquet.",hint:"url = 'https://en.wikipedia.org/wiki/States_and_union_territories_of_India'. tables = pd.read_html(url). Check tables[1] etc.",solution:"tables = pd.read_html(\n    'https://en.wikipedia.org/wiki/States_and_union_territories_of_India'\n)\nstates = tables[1]  # adjust index as needed\nprint(states.head())\nstates.to_parquet('indian_states.parquet', index=False)"}],
    experiments:[{title:"Exp 1: JSON orient visualiser",desc:"See how the same data looks in different JSON orient formats.",inputs:[{id:"orient",label:"orient=",val:"records",type:"text",w:"110px"}],runId:"fmt_orient"}],
    mistakes:[{title:"Reading Excel without openpyxl",wrong:"pd.read_excel('file.xlsx')  # ModuleNotFoundError!",fix:"pip install openpyxl\n# For .xls: pip install xlrd",why:"Pandas does not bundle Excel engines. <code>openpyxl</code> handles .xlsx (Excel 2007+). <code>xlrd</code> handles legacy .xls files."},
      {title:"Pickle security trap",wrong:"# Loading untrusted pickle is DANGEROUS!\ndf = pd.read_pickle('from_internet.pkl')",fix:"# Only unpickle files YOU created\n# Use Parquet for data exchange:\ndf = pd.read_parquet('from_internet.parquet')",why:"Pickle can execute arbitrary Python code on load. Never load a .pkl from an untrusted source. Use Parquet or CSV for data exchange."}],
  },
  {
    id:"databases",
    icon:"DB",
    title:"Databases and Web APIs",
    desc:"SQL, SQLite, and pulling live JSON data",
    xpReward:60,
    chapter:2,
    subtopic:"2.3 Databases and APIs",
    theory:[{title:"Why Databases with Pandas?",content:"Real-world data lives in databases (PostgreSQL, MySQL, SQLite) or Web APIs. Pandas pulls data directly from both into analysis-ready DataFrames.",analogy:"The database is a warehouse, Pandas is the forklift. pd.read_sql() drives in, grabs exactly what you need.",},
      {title:"read_sql flavours",points:["pd.read_sql(query, connection) \u2014 runs any SQL","pd.read_sql_table('table_name', con) \u2014 entire table","pd.read_sql_query('SELECT...', con) \u2014 SQL only","Use parameterised queries to prevent SQL injection: params=[val]"],},
      {title:"Connecting to Databases",points:["SQLite (built-in): import sqlite3; con = sqlite3.connect('db.db')","PostgreSQL: create_engine('postgresql://user:pass@host/db')","MySQL: create_engine('mysql+pymysql://user:pass@host/db')","Always close connections or use 'with' statement"],},
      {title:"Web APIs",content:"Most APIs return JSON. Pattern: requests.get(url) -> .json() -> pd.DataFrame(). Works for weather, stocks, government open data.",useCases:[{icon:"WX",title:"Weather API",body:"OpenWeatherMap -> pd.DataFrame(response.json()['list'])"},{icon:"STK",title:"Stock Data",body:"Yahoo Finance JSON -> DataFrame -> price chart"},{icon:"GOV",title:"Govt Open Data",body:"data.gov.in API -> JSON records -> analysis"},{icon:"REST",title:"REST APIs",body:"Paginate, concat DataFrames, clean and analyse"}],}],
    code:"import pandas as pd\nimport sqlite3\nimport requests\n\n# SQLite\ncon = sqlite3.connect('school.db')\n\n# Read entire table\ndf = pd.read_sql('SELECT * FROM students', con)\nprint(df.head())\n\n# Query with filter\ndf_results = pd.read_sql(\"\"\"\n    SELECT s.name, s.grade, e.score\n    FROM students s\n    JOIN exam_results e ON s.id = e.student_id\n    WHERE e.score > 80\n    ORDER BY e.score DESC\n\"\"\", con)\nprint(df_results)\n\n# Write back to database\ndf_new = pd.DataFrame({'name':['Mia','Liam'],'grade':['10','11']})\ndf_new.to_sql('students', con, if_exists='append', index=False)\n\n# Web API\nurl = 'https://jsonplaceholder.typicode.com/users'\nresponse = requests.get(url)\nresponse.raise_for_status()\n\ndf_users = pd.DataFrame(response.json())\nprint(df_users[['id','name','email']].head())\n\n# Nested JSON\nfrom pandas import json_normalize\ndf_flat = json_normalize(response.json(), sep='_')\nprint(df_flat.columns.tolist())\n\ncon.close()",
    purePython:{title:"Database queries without Pandas",comparisons:[{task:"Read SQL query into a usable structure",pyCode:"import sqlite3\n\ncon = sqlite3.connect('school.db')\ncur = con.cursor()\ncur.execute(\"\"\"\n    SELECT name, grade, score\n    FROM students s\n    JOIN exam_results e\n      ON s.id = e.student_id\n    WHERE e.score > 80\n\"\"\")\nrows = cur.fetchall()\ncols = [d[0] for d in cur.description]\n\n# Build dicts manually\ndata = [dict(zip(cols, row))\n        for row in rows]\n\ntop_a = [r for r in data\n         if r['grade'] == 'A']\ncon.close()",pdCode:"import pandas as pd, sqlite3\n\ncon = sqlite3.connect('school.db')\ndf = pd.read_sql(\"\"\"\n    SELECT name, grade, score\n    FROM students s\n    JOIN exam_results e\n      ON s.id = e.student_id\n    WHERE e.score > 80\n\"\"\", con)\n\ntop_a = df[df['grade'] == 'A']\ncon.close()",verdict:"Pure sqlite3 gives tuples \u2014 manually build column names, zip into dicts, manually filter. Pandas gives a full DataFrame ready for groupby, pivot, plot instantly.",saved:"~70% fewer lines"},
        {task:"Fetch web API and compute summary stats",pyCode:"import requests\n\nr = requests.get('https://api.example.com/scores')\ndata = r.json()\n\n# Manual average\ntotal = sum(d['score'] for d in data)\navg = total / len(data)\n\n# Group by grade -- manual dict\nby_grade = {}\nfor d in data:\n    g = d['grade']\n    by_grade.setdefault(g, [])\n    by_grade[g].append(d['score'])\n\navgs = {g: sum(v)/len(v)\n        for g,v in by_grade.items()}",pdCode:"import requests, pandas as pd\n\ndf = pd.DataFrame(\n    requests.get(\n        'https://api.example.com/scores'\n    ).json()\n)\n\navg = df['score'].mean()\navgs = df.groupby('grade')['score'].mean()",verdict:"Pure Python is 3x longer for basic aggregation. groupby().mean() replaces nested dict accumulation. For any real API analysis, Pandas is indispensable.",saved:"~75% fewer lines"}]},
    quiz:[{q:"Which to_sql argument overwrites existing table?",opts:["if_exists='overwrite'","if_exists='replace'","mode='overwrite'","append=False"],correct:1,explain:"if_exists='replace' drops and recreates. 'append' adds rows. 'fail' (default) raises ValueError if table exists."},
      {q:"response.raise_for_status() on a 404 response does:",opts:["Prints a warning","Returns None","Raises HTTPError exception","Retries the request"],correct:2,explain:"raise_for_status() raises HTTPError for 4xx/5xx responses. Without it, a 404 silently looks like success."},
      {q:"json_normalize() is used when:",opts:["JSON is too large","JSON has nested objects inside cells","JSON uses 'columns' orient","JSON contains dates"],correct:1,explain:"When JSON has nested fields (address.city, company.name), pd.DataFrame() puts nested dicts in a single cell. json_normalize() flattens them into separate columns."}],
    openChallenges:[{q:"Create SQLite 'library.db' with 'books' table. Insert 5 books. Query books after 2010. Write results to 'recent_books' table.",hint:"sqlite3.connect, CREATE TABLE, INSERT, pd.read_sql WHERE year>2010, .to_sql('recent_books', ...)",solution:"import sqlite3, pandas as pd\ncon = sqlite3.connect('library.db')\ncur = con.cursor()\ncur.execute('CREATE TABLE IF NOT EXISTS books (id INT, title TEXT, year INT)')\nbooks = [(1,'Atomic Habits',2018),(2,'Ikigai',2016),(3,'Sapiens',2011),(4,'1984',1949),(5,'Clean Code',2008)]\ncur.executemany('INSERT INTO books VALUES (?,?,?)', books)\ncon.commit()\nrecent = pd.read_sql('SELECT * FROM books WHERE year > 2010', con)\nrecent.to_sql('recent_books', con, if_exists='replace', index=False)\ncon.close()"},
      {q:"Fetch https://jsonplaceholder.typicode.com/posts. Find the user who posted the most using groupby.",hint:"pd.DataFrame(requests.get(url).json()) then df.groupby('userId').size().idxmax()",solution:"import requests, pandas as pd\ndf = pd.DataFrame(requests.get('https://jsonplaceholder.typicode.com/posts').json())\ntop = df.groupby('userId').size().idxmax()\nprint(f'Top poster: User {top}')"}],
    experiments:[{title:"Exp 1: SQL vs Pandas filter",desc:"Enter a min score. See equivalent SQL and Pandas.",inputs:[{id:"min_score",label:"Min score",val:"80",type:"number",w:"60px"}],runId:"db_filter"}],
    mistakes:[{title:"SQL injection with string formatting",wrong:"name = input('Name: ')\ndf = pd.read_sql(f\"SELECT * FROM users WHERE name='{name}'\", con)\n# Attacker types: ' OR '1'='1",fix:"df = pd.read_sql(\n    \"SELECT * FROM users WHERE name=?\",\n    con, params=[name]  # safe",why:"String-formatted SQL allows injection. A malicious input can expose your entire database. Always use parameterised queries."},
      {title:"Forgetting to close connections",wrong:"con = sqlite3.connect('school.db')\ndf = pd.read_sql('SELECT * FROM s', con)\n# never closed -> file lock, memory leak",fix:"with sqlite3.connect('school.db') as con:\n    df = pd.read_sql('SELECT * FROM s', con)\n# auto-closed on exit",why:"Unclosed connections hold file locks and waste memory. Use a <code>with</code> statement or call <code>con.close()</code>."}],
  },
  {
    id:"large_files",
    icon:"LF",
    title:"Handling Large Files",
    desc:"Chunking, selective loading, and memory tricks",
    xpReward:70,
    chapter:2,
    subtopic:"2.4 Large Files",
    theory:[{title:"The Memory Problem",content:"pd.read_csv() loads the ENTIRE file into RAM. A 2GB CSV on a 4GB machine will crash. Large file handling: only load what you need, when you need it.",analogy:"Don't carry the whole library to your desk. Use usecols to pick only the books you need, nrows to check the index, chunksize to read one shelf at a time.",},
      {title:"nrows \u2014 Peek First",points:["pd.read_csv('huge.csv', nrows=5) \u2014 read 5 rows to inspect structure","Use this before any full read to check dtypes and column names","Combine with dtype inspection to plan memory-efficient loading"],},
      {title:"usecols \u2014 Column Pruning",points:["usecols=['date','price','volume'] \u2014 load 3 of 50 columns","Can use names (list of strings) or positions (list of ints)","Callable: usecols=lambda c: c.startswith('sales_')","3 of 50 columns = loading only ~6% of the data"],},
      {title:"chunksize \u2014 Streaming",content:"chunksize=N makes read_csv return a TextFileReader (iterator). Each iteration gives you N rows. RAM stays constant regardless of file size.",points:["Use for: aggregations over huge files","Use for: filtering and saving a subset","Use for: ETL pipelines","pd.concat(chunks) to combine if needed"],},
      {title:"dtype= \u2014 Memory Optimisation",content:"Pandas defaults to int64 and float64. If values only go 0-100, int8 saves 87.5% memory.",points:["dtype={'age':'int8','score':'float32'} at read time","dtype={'col':'category'} \u2014 best for low-cardinality strings","df.memory_usage(deep=True) to measure current RAM"],},
      {title:"Use Cases",useCases:[{icon:"LOG",title:"20GB Log File",body:"chunksize=100000, filter in each chunk, concat results"},{icon:"ECO",title:"E-commerce",body:"usecols=['date','product','revenue'] from 200-column table"},{icon:"CEN",title:"Census Data",body:"nrows=1000 to explore, then full optimised load"},{icon:"ETL",title:"Real-time Pipeline",body:"chunksize streaming: transform chunk, write to DB, next chunk"}],}],
    code:"import pandas as pd\n\n# 1. PEEK first\ndf_peek = pd.read_csv('sales_data.csv', nrows=5)\nprint('Columns:', df_peek.columns.tolist())\nprint('Dtypes:', df_peek.dtypes)\n\n# 2. usecols -- load only what you need\ndf_small = pd.read_csv(\n    'sales_data.csv',\n    usecols=['date','product','revenue'],\n    dtype={'revenue':'float32'}\n)\nprint(f'Memory: {df_small.memory_usage(deep=True).sum()/1e6:.1f} MB')\n\n# 3. chunksize -- process in batches\ntotal_revenue = 0.0\nfor chunk in pd.read_csv('sales_data.csv', chunksize=50000):\n    total_revenue += chunk['revenue'].sum()\nprint(f'Total revenue: {total_revenue:,.2f}')\n\n# 4. Filter and save subset\nresults = []\nfor chunk in pd.read_csv('sales_data.csv', chunksize=50000):\n    filtered = chunk[chunk['revenue'] > 10000]\n    results.append(filtered)\nbig_sales = pd.concat(results, ignore_index=True)\n\n# 5. dtype optimisation\ndf_opt = pd.read_csv('sales_data.csv', dtype={\n    'product_id': 'int32',\n    'region':     'category',\n    'revenue':    'float32',\n})\nprint(df_opt.memory_usage(deep=True).sum()/1e6, 'MB')",
    purePython:{title:"Processing large files without Pandas",comparisons:[{task:"Sum a column in a 10GB CSV without loading it all",pyCode:"import csv\n\ntotal = 0.0\ncount = 0\n\nwith open('sales_data.csv', 'r') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        # One row at a time -- slow!\n        total += float(row['revenue'])\n        count += 1\n\n# 10GB file = 3-5 minutes in Python\nprint(f'Total: {total:,.2f}')",pdCode:"import pandas as pd\n\ntotal = 0.0\nfor chunk in pd.read_csv(\n    'sales_data.csv',\n    chunksize=100000,\n    usecols=['revenue']\n):\n    total += chunk['revenue'].sum()\n\n# 10GB file = ~30-60 seconds\nprint(f'Total: {total:,.2f}')",verdict:"Pure Python: one row at a time in an interpreted loop. Pandas: 100k rows at once via NumPy C code. For 10GB, Pandas chunking is 5-10x faster.",saved:"5-10x faster execution"},
        {task:"Load only specific columns from a huge file",pyCode:"import csv\n\nwith open('huge.csv', 'r') as f:\n    reader = csv.DictReader(f)\n    # Reads ALL columns per row!\n    # You filter after the fact\n    data = [\n        {'date': r['date'],\n         'revenue': float(r['revenue'])}\n        for r in reader\n    ]",pdCode:"# usecols skips parsing at C level\n# RAM AND time saved\ndf = pd.read_csv(\n    'huge.csv',\n    usecols=['date','revenue']\n)\n# Unwanted cols never enter memory",verdict:"csv module reads every column regardless. Pandas usecols tells the C parser to skip unwanted columns at the byte level. Up to 95% RAM reduction for wide files.",saved:"Up to 95% RAM reduction"}]},
    quiz:[{q:"pd.read_csv('file.csv', chunksize=1000) returns:",opts:["First 1000 rows as DataFrame","List of DataFrames","TextFileReader iterator yielding 1000-row DataFrames","Error"],correct:2,explain:"With chunksize, read_csv returns a TextFileReader (iterator). Each next() yields a DataFrame with up to chunksize rows. RAM stays constant."},
      {q:"A column has 4 unique string values across 10M rows. Which dtype saves most memory?",opts:["object","str","category","string"],correct:2,explain:"'category' stores each unique value once and uses integer codes. 4 unique values across 10M rows: ~40MB vs ~800MB for object."},
      {q:"Safest first step before loading a 5GB CSV?",opts:["Load entire file","Use chunksize=1000","pd.read_csv('file.csv', nrows=5)","Convert to Parquet first"],correct:2,explain:"Always peek with nrows=5 first. Loads 5 rows instantly, shows all column names and dtypes. Plan usecols and dtype before committing."}],
    openChallenges:[{q:"Write chunk_aggregate(filepath, group_col, value_col) that processes a huge CSV in chunks and returns total sum per group.",hint:"Use a dict to accumulate: {group: sum}. For each chunk do chunk.groupby(group_col)[value_col].sum() and add to totals.",solution:"def chunk_aggregate(filepath, group_col, value_col, chunksize=50000):\n    totals = {}\n    for chunk in pd.read_csv(filepath, chunksize=chunksize,\n                             usecols=[group_col, value_col]):\n        sums = chunk.groupby(group_col)[value_col].sum()\n        for k, v in sums.items():\n            totals[k] = totals.get(k, 0) + v\n    return pd.Series(totals).sort_values(ascending=False)"},
      {q:"You have a 3GB CSV with 80 columns. Load only 5 relevant ones. Use dtype optimisation to get under 100MB. Measure before/after.",hint:"pd.read_csv(..., usecols=[...], dtype={'col':'category',...}). Use df.memory_usage(deep=True).sum()/1e6 to measure MB.",solution:"df_peek = pd.read_csv('huge.csv', nrows=3)\nprint(df_peek.dtypes)\n\ndf = pd.read_csv('huge.csv',\n    usecols=['date','region','product','units','revenue'],\n    dtype={\n        'region':  'category',\n        'product': 'category',\n        'units':   'int32',\n        'revenue': 'float32'\n    })\nprint(df.memory_usage(deep=True).sum()/1e6, 'MB')"}],
    experiments:[{title:"Exp 1: dtype memory calculator",desc:"See how dtype choice affects memory for 1M rows.",inputs:[{id:"dtype",label:"dtype",val:"int64",type:"text",w:"100px"},{id:"rows",label:"Rows",val:"1000000",type:"number",w:"110px"}],runId:"lf_dtype"},
      {title:"Exp 2: usecols RAM estimator",desc:"Choose how many columns to load from a 100-column, 1M-row dataset.",inputs:[{id:"ncols",label:"Cols (of 100)",val:"5",type:"number",w:"60px"}],runId:"lf_usecols"}],
    mistakes:[{title:"iterrows() on large DataFrames",wrong:"for index, row in df.iterrows():\n    total += row['revenue']  # Python loop = slow!",fix:"total = df['revenue'].sum()  # vectorised, 100x faster\n# For huge files use chunksize, not iterrows",why:"<code>iterrows()</code> converts each row to a Series (expensive) in a Python loop (slow). For aggregations always use vectorised methods. For files too big for RAM, use <code>chunksize</code>."},
      {title:"Load all then drop columns",wrong:"df = pd.read_csv('huge.csv')  # loads all 80 cols\ndf = df[['date','revenue']]   # drops 78 after the fact!",fix:"df = pd.read_csv('huge.csv', usecols=['date','revenue'])\n# 78 cols never enter memory",why:"Loading and dropping wastes RAM \u2014 all 80 columns are fully parsed and held before the drop. <code>usecols</code> skips unwanted columns at the C parser level."}],
  },
  {
    id:"inspection",
    icon:"INS",
    title:"Data Inspection",
    desc:"Know your data before you touch it",
    xpReward:50,
    chapter:3,
    subtopic:"3.1 Inspection",
    theory:[{title:"Why Inspect First?",content:"Blindly running operations on unknown data is the number 1 cause of silent bugs. Always inspect first: shape, dtypes, nulls, statistical ranges. These 4 checks take 30 seconds and save hours.",analogy:"A doctor does not prescribe medicine before examining the patient. Inspection is your diagnosis step.",},
      {title:"The Employee Dataset (Chapter 3)",content:"Throughout Chapter 3 we use an employee dataset with Emp_ID as index (101-106): Name, Department (Engineering/HR/Sales), Salary (75k-130k), Years_Exp (2-8).",points:["Emp_ID: 101-106 (set as index)","Departments: Engineering (3), Sales (2), HR (1)","Salary range: 75,000 to 130,000","Years experience: 2 to 8"],},
      {title:"head() and tail()",content:"df.head(n) returns first n rows (default 5). df.tail(n) returns last n rows. Use head() to verify loading, tail() to check trailing rows for garbage/totals.",points:["df.head() -- first 5 rows","df.head(10) -- first 10 rows","df.tail(3) -- last 3 rows","df.sample(5) -- 5 random rows (unbiased)"],},
      {title:"info() -- The Health Check",content:"df.info() prints: column names, non-null counts, dtypes, total memory. Fastest way to spot missing data (non-null count < total rows) and wrong dtypes (numeric stored as object).",analogy:"info() is like a blood test report -- one glance shows what needs attention.",},
      {title:"describe() -- Statistical Summary",content:"Computes count, mean, std, min, 25th/50th/75th percentile, max for all numeric columns. Use describe(include='all') for string columns too. Look for: outliers (max >> 75%), zero std, unexpected min/max.",},
      {title:"value_counts, unique, nunique",points:["series.value_counts() -- frequency table, sorted by count","series.value_counts(normalize=True) -- as proportions 0.0-1.0","series.unique() -- array of unique values","series.nunique() -- count of unique values (like SQL COUNT DISTINCT)","df.nunique() -- unique count per column"],},
      {title:"Use Cases",useCases:[{icon:"HC",title:"Healthcare",body:"info() reveals age stored as object instead of int -- dtype bug caught before analysis"},{icon:"EC",title:"E-commerce",body:"value_counts() on category shows 80% of sales are 2 categories"},{icon:"SV",title:"Survey Data",body:"describe() shows max age=999 -- data entry error caught before modelling"},{icon:"FN",title:"Finance",body:"nunique() on account_id confirms each row is unique"}],}],
    code:"import pandas as pd\n\ndata = {\n    'Emp_ID':    [101,102,103,104,105,106],\n    'Name':      ['Alice','Bob','Charlie','David','Eve','Frank'],\n    'Department':['Engineering','HR','Engineering','Sales','Engineering','Sales'],\n    'Salary':    [120000,75000,110000,90000,130000,95000],\n    'Years_Exp': [5,3,4,2,8,3]\n}\ndf = pd.DataFrame(data)\ndf.set_index('Emp_ID', inplace=True)\n\n# Peek\nprint('head(3):')\nprint(df.head(3))\nprint('\\ntail(2):')\nprint(df.tail(2))\n\n# Health check\nprint('\\ninfo():')\ndf.info()\n\n# Stats\nprint('\\ndescribe():')\nprint(df.describe())\n\n# Frequencies\nprint('\\nDepartment value_counts:')\nprint(df['Department'].value_counts())\n\n# Proportions\nprint('\\nProportions:')\nprint(df['Department'].value_counts(normalize=True).round(2))\n\n# Unique\nprint('\\nunique depts:', df['Department'].unique())\nprint('nunique:', df['Department'].nunique())\nprint('nunique per col:')\nprint(df.nunique())",
    purePython:{title:"Inspecting data without Pandas",comparisons:[{task:"Get frequency counts of a column",pyCode:"from collections import Counter\n\ndepts = [r['Department'] for r in data]\ncounts = Counter(depts)\n\n# Sorted by frequency\nfor k,v in counts.most_common():\n    print(k, v)\n\n# Normalised -- no built-in\ntotal = len(depts)\nfor k,v in counts.most_common():\n    print(k, f'{v/total:.2f}')",pdCode:"df['Department'].value_counts()\n\n# Normalised in one argument:\ndf['Department'].value_counts(\n    normalize=True\n).round(2)",verdict:"Counter is fine for one column. Pandas value_counts gives sorted frequency + normalisation in one call, works on any Series, chains with other operations.",saved:"~60% fewer lines"}]},
    quiz:[{q:"df.info() shows 'age' has non-null count = 80, but df.shape = (100, 5). What does this mean?",opts:["age has 80 unique values","age has 20 missing (NaN) values","age is an int column","age has 80 rows"],correct:1,explain:"info() shows non-null count per column. If total=100 and non-null=80, then 20 values are NaN. This is the fastest way to spot missing data."},
      {q:"Which shows proportions instead of raw counts?",opts:["value_counts(ratio=True)","value_counts(normalize=True)","value_counts(percent=True)","value_counts() / len(df)"],correct:1,explain:"normalize=True divides each count by the total, returning values 0.0 to 1.0. Option d also works but is manual."},
      {q:"series.nunique() vs series.unique() -- difference?",opts:["Identical","nunique() returns COUNT of uniques; unique() returns the VALUES","unique() returns count; nunique() returns array","unique() works on numbers only"],correct:1,explain:"nunique() = integer count. unique() = array of distinct values. Use nunique() for counting, unique() to see what the values are."},
      {q:"describe(include='all') vs describe() -- difference?",opts:["include='all' is slower","describe() only covers numeric; include='all' adds string stats too","Identical output","include='all' adds median"],correct:1,explain:"By default describe() only analyses numeric columns. include='all' adds string columns showing count, unique, top (most frequent), and freq."}],
    openChallenges:[{q:"Load any CSV. Run the 4-step inspection: shape, info(), describe(), value_counts() on one categorical column. Write a comment next to each output explaining what you learned.",hint:"This is a workflow challenge. The goal is the habit.",solution:"df = pd.read_csv('any_data.csv')\nprint(df.shape)         # rows, cols -- how big?\ndf.info()               # dtypes correct? any nulls?\nprint(df.describe())    # outliers? suspicious min/max?\nprint(df['category'].value_counts())  # dominant classes?"},
      {q:"Using value_counts(normalize=True), find which department has more than 30% of employees. Confirm with a boolean check.",hint:"props = df['Department'].value_counts(normalize=True). Then props[props > 0.3]",solution:"props = df['Department'].value_counts(normalize=True)\nprint(props)\nprint('\\nOver 30%:')\nprint(props[props > 0.3])"}],
    experiments:[{title:"Exp 1: head/tail explorer",desc:"Choose how many rows to preview.",inputs:[{id:"n",label:"n rows",val:"3",type:"number",w:"60px"}],runId:"ins_headtail"},
      {title:"Exp 2: nunique vs value_counts",desc:"Enter a column name to see unique count and frequency.",inputs:[{id:"col",label:"Column",val:"Department",type:"text",w:"130px"}],runId:"ins_nunique"}],
    mistakes:[{title:"describe() misses string columns",wrong:"df.describe()  # only shows numeric -- string columns invisible!",fix:"df.describe(include='all')   # includes string stats\ndf['dept'].value_counts()    # or inspect individually",why:"<code>describe()</code> silently skips non-numeric columns. Use <code>include='all'</code> or inspect string columns with <code>value_counts()</code>."},
      {title:"Confusing nunique with unique",wrong:"n = df['dept'].unique()   # returns array, not count!\nif n > 2: ...             # TypeError: array > 2",fix:"n = df['dept'].nunique()  # returns int\nif n > 2: ...             # works",why:"<code>unique()</code> returns the array of values. <code>nunique()</code> returns the integer count. They are completely different types."}],
  },
  {
    id:"basic_selection",
    icon:"SEL",
    title:"Basic Selection",
    desc:"Columns, rows, and simple slicing",
    xpReward:45,
    chapter:3,
    subtopic:"3.2 Basic Selection",
    theory:[{title:"Selecting Columns",content:"Single column: df['col'] returns a Series. Double brackets df[['col1','col2']] returns a DataFrame. This distinction matters -- many operations behave differently on Series vs DataFrame.",analogy:"df['age'] is like pulling one drawer from a cabinet. df[['age','name']] pulls two drawers and gives you a mini-cabinet back.",},
      {title:"Dot Notation -- df.col",content:"df.age works as shortcut for df['age'] ONLY when: no spaces, no special characters, and no clash with Pandas method names. Prefer bracket notation for production code.",points:["OK: df.age, df.salary","BAD: df.first name -- SyntaxError (space)","BAD: df.count -- returns method, not column! (collision)","BAD: df.mean, df.min, df.max, df.sum, df.index, df.values"],},
      {title:"Row Slicing with []",content:"df[0:3] slices rows by position -- returns rows 0,1,2 (exclusive stop, like Python lists). Only works for row slicing with integers.",},
      {title:"Multiple Column Patterns",points:["df[['a','b','c']] -- explicit list (double brackets)","df.loc[:,'a':'c'] -- column range by label (inclusive)","df.iloc[:,0:3] -- first 3 columns by position","df.filter(like='sales') -- columns containing 'sales'","df.filter(regex='^Q') -- columns starting with Q"],},
      {title:"Use Cases",useCases:[{icon:"RPT",title:"Report Generation",body:"df[['name','dept','salary']] -- extract display columns"},{icon:"ML",title:"ML Feature Matrix",body:"X = df[feature_cols]; y = df['target']"},{icon:"PRI",title:"Data Privacy",body:"df.drop(columns=['email','phone','ssn']) -- remove PII"},{icon:"FIN",title:"Financial Analysis",body:"df.filter(regex='^Q') -- all quarterly columns dynamically"}],}],
    code:"import pandas as pd\n\ndata = {\n    'Emp_ID':    [101,102,103,104,105,106],\n    'Name':      ['Alice','Bob','Charlie','David','Eve','Frank'],\n    'Department':['Engineering','HR','Engineering','Sales','Engineering','Sales'],\n    'Salary':    [120000,75000,110000,90000,130000,95000],\n    'Years_Exp': [5,3,4,2,8,3],\n    'Q1_Sales':  [15000,8000,12000,9500,18000,10000],\n    'Q2_Sales':  [16500,7500,13000,9000,19000,11000],\n}\ndf = pd.DataFrame(data)\ndf.set_index('Emp_ID', inplace=True)\n\n# Single column -> Series\nages = df['Salary']\nprint(type(ages))         # <class 'Series'>\nprint(ages)\n\n# Multiple columns -> DataFrame\nsubset = df[['Name','Salary']]\nprint(type(subset))       # <class 'DataFrame'>\nprint(subset)\n\n# Dot notation (careful!)\nprint(df.Department)      # works\n\n# Row slicing\nprint(df[1:3])            # rows 1 and 2 by position\n\n# Column range via loc\nprint(df.loc[:,'Salary':'Years_Exp'])\n\n# filter() -- dynamic selection\nq_cols = df.filter(regex='^Q')\nprint(q_cols)",
    purePython:{title:"Column selection without Pandas",comparisons:[{task:"Select multiple columns from a list of dicts",pyCode:"cols = ['Name','Salary']\nresult = [{k:r[k] for k in cols}\n          for r in data]\nfor row in result:\n    print(row)",pdCode:"df[['Name','Salary']]",verdict:"Pure Python requires a dict comprehension per row. Pandas returns a new DataFrame in one expression with all querying capabilities intact.",saved:"~80% fewer lines"},
        {task:"Select columns matching a pattern",pyCode:"q_cols = [c for c in data[0].keys()\n          if c.startswith('Q')]\nresult = [{k:r[k] for k in q_cols}\n          for r in data]",pdCode:"df.filter(regex='^Q')",verdict:"Pure Python: two steps -- find keys, extract. Pandas filter() with regex: one call. For 100+ columns with complex patterns, the difference is dramatic.",saved:"~75% fewer lines"}]},
    quiz:[{q:"df['Salary'] vs df[['Salary']] -- what is different?",opts:["Nothing","df['Salary'] returns Series; df[['Salary']] returns single-column DataFrame","df[['Salary']] raises error","df['Salary'] returns a list"],correct:1,explain:"Single brackets = Series (1D). Double brackets (list inside []) = DataFrame (2D). Many methods behave differently on Series vs DataFrame."},
      {q:"df.count accessed without () is dangerous because:",opts:["Causes MemoryError","'count' is a Pandas method -- df.count returns the method object, not a column","Only works on numerics","Identical to df['count']"],correct:1,explain:"df.count (without ()) returns the method object itself, not a column named 'count'. Dot notation silently shadows columns that share a method name."},
      {q:"df[1:3] returns:",opts:["Rows where index label is 1 or 3","Rows at positions 1 and 2 (exclusive stop)","Rows 1,2,3 (inclusive)","Columns 1 and 2"],correct:1,explain:"df[start:stop] slices ROWS by position with exclusive stop -- exactly like Python list slicing."}],
    openChallenges:[{q:"Given df with 10+ columns: (a) select 'Name' and 'Salary', (b) all columns between 'Department' and 'Salary' using loc, (c) all columns containing 'Sales' using filter().",hint:"(a) df[['Name','Salary']], (b) df.loc[:,'Department':'Salary'], (c) df.filter(like='Sales')",solution:"(a) df[['Name','Salary']]\n(b) df.loc[:,'Department':'Salary']\n(c) df.filter(like='Sales')\n# Or regex: df.filter(regex='Sales')"},
      {q:"You have df.columns = ['id','First Name','count','mean','std']. Which cannot be accessed with dot notation and why?",hint:"Think: spaces in names, and Pandas method names.",solution:"# 'First Name' -> has space -> SyntaxError\n# 'count','mean','std' -> Pandas method names\n# -> returns method object, not column\n\n# Safe for all:\ndf['First Name']\ndf['count']\ndf['mean']"}],
    experiments:[{title:"Exp 1: Series vs DataFrame type checker",desc:"Type 'single' or 'double' to see the type difference.",inputs:[{id:"brackets",label:"Brackets",val:"single",type:"text",w:"90px"}],runId:"sel_brackets"}],
    mistakes:[{title:"Dot notation on column named 'count'",wrong:"df.count   # Returns <bound method DataFrame.count> -- not your data!",fix:"df['count']  # always use brackets for ambiguous names",why:"Pandas has methods named count, mean, std, min, max, sum, index, values. If your column shares any of these, dot notation returns the method. Use <code>df['colname']</code> to be safe."},
      {title:"Single bracket multi-column attempt",wrong:"df['Name','Salary']  # KeyError: ('Name', 'Salary')",fix:"df[['Name','Salary']]  # list inside brackets",why:"<code>df['Name','Salary']</code> is interpreted as a tuple key lookup -- not multiple columns. Pass a Python list: <code>df[['Name','Salary']]</code>."}],
  },
  {
    id:"adv_indexing",
    icon:"IDX",
    title:"Advanced Indexing",
    desc:".loc, .iloc, .at, .iat -- scalar to multi-dimensional",
    xpReward:60,
    chapter:3,
    subtopic:"3.3 Advanced Indexing",
    theory:[{title:"The Four Indexers",content:"Pandas has four indexing accessors. Each solves a specific problem.",points:["loc[rows, cols] -- label-based, both rows AND columns","iloc[rows, cols] -- integer position, both axes","at[row, col] -- single scalar by label (fastest)","iat[row, col] -- single scalar by integer position (fastest)"],},
      {title:".loc -- Label Power",content:".loc accepts a single label, list of labels, a slice (inclusive!), or a boolean array. Selects BOTH rows and columns simultaneously.",points:["df.loc['jane@e.com'] -- single row by label","df.loc[['a','c'],'age'] -- two rows, one column","df.loc[:, ['name','age']] -- all rows, two columns","df.loc[101:103, 'Name':'Department'] -- row+col range (both inclusive)"],},
      {title:".iloc -- Position Power",content:".iloc works like NumPy array indexing -- purely positional, exclusive stop. Never affected by index labels.",points:["df.iloc[0] -- first row","df.iloc[-1] -- last row","df.iloc[1:3, 0:2] -- rows 1-2, cols 0-1","df.iloc[[0,2,4], :] -- rows 0, 2, 4, all cols"],},
      {title:".at and .iat -- Scalar Speed",content:".at[row_label, col_label] and .iat[row_pos, col_pos] are optimised for accessing a SINGLE cell. Up to 10x faster than .loc/.iloc in tight loops.",analogy:"loc/iloc are forklifts -- great for bulk. at/iat are tweezers -- optimised for picking exactly one thing precisely and fast.",},
      {title:"Mixing Label and Position",content:"Use .loc with .index to convert: df.loc[df.index[2]] -- get row at position 2 using its label. Or df.columns.get_loc('col') to find a column position.",}],
    code:"import pandas as pd\n\ndata = {\n    'Emp_ID':    [101,102,103,104,105,106],\n    'Name':      ['Alice','Bob','Charlie','David','Eve','Frank'],\n    'Department':['Engineering','HR','Engineering','Sales','Engineering','Sales'],\n    'Salary':    [120000,75000,110000,90000,130000,95000],\n    'Years_Exp': [5,3,4,2,8,3]\n}\ndf = pd.DataFrame(data)\ndf.set_index('Emp_ID', inplace=True)\n\n# .loc -- label rows AND cols\nprint(df.loc[101])                       # one row\nprint(df.loc[101:103, ['Name','Salary']]) # row range + 2 cols\nprint(df.loc[:, 'Salary':'Years_Exp'])   # all rows, col range\n\n# .iloc -- position rows AND cols\nprint(df.iloc[0])          # first row\nprint(df.iloc[-1])         # last row\nprint(df.iloc[0:3, 0:2])   # rows 0-2, cols 0-1\nprint(df.iloc[[0,4]])      # rows 0 and 4\n\n# .at -- single scalar (label)\nval = df.at[101, 'Salary']\nprint('Alice Salary:', val)    # 120000\n\n# .iat -- single scalar (position)\nval2 = df.iat[2, 2]\nprint('Row 2 col 2:', val2)    # 110000\n\n# Modify safely\ndf.loc[df['Name']=='Bob', 'Salary'] = 80000",
    purePython:{title:"Precise selection without Pandas",comparisons:[{task:"Select specific rows AND columns simultaneously",pyCode:"cols = ['Name','Salary']\nresult = [\n  {k: r[k] for k in cols}\n  for r in data\n  if r['Name'] in ['Alice','Charlie']\n]",pdCode:"df.loc[[101,103], ['Name','Salary']]",verdict:".loc selects rows AND columns simultaneously in one expression. Pure Python requires a nested list comprehension that grows complex with each additional filter.",saved:"~70% fewer lines"},
        {task:"Access a single cell value",pyCode:"# Find the row, extract the field\nrow = next(r for r in data\n           if r['Emp_ID'] == 101)\nsalary = row['Salary']",pdCode:"salary = df.at[101, 'Salary']\n# or df.iat[0, 2]",verdict:".at is a direct O(1) dictionary-style lookup. Pure Python needs to scan a list to find the matching row.",saved:"~60% fewer lines"}]},
    quiz:[{q:"df.loc[101:103, 'Name':'Department'] -- how many rows and columns?",opts:["2 rows, 1 col","3 rows, 2 cols","2 rows, 2 cols","3 rows, all cols"],correct:1,explain:".loc slicing is INCLUSIVE on both ends. 101:103 returns rows 101,102,103 (3 rows). 'Name':'Department' returns Name and Department (2 columns)."},
      {q:"When should you prefer .at over .loc?",opts:["MultiIndex only","Performance-critical loops accessing millions of individual cells","Column name has spaces","Always"],correct:1,explain:".at is optimised for single-cell label access. In a tight loop accessing millions of cells, .at can be 5-10x faster than .loc. For bulk operations use .loc."},
      {q:"df.iloc[-1] returns:",opts:["Error -- negative indexing unsupported","Second-to-last row","Last row","Last column"],correct:2,explain:"Negative indexing works in iloc like Python lists. iloc[-1] = last row, iloc[-2] = second to last."},
      {q:"After df.set_index('email'), get row at POSITION 2:",opts:["df.loc[2]","df.iloc[2]","df.at[2]","df[2]"],correct:1,explain:"Once index is email strings, .loc[2] raises KeyError. .iloc[2] always works by position regardless of index type."}],
    openChallenges:[{q:"Select all rows where Department is 'Engineering' using .loc, return only Name and Salary. Repeat using .iloc (hint: use df.columns.get_loc() to find column positions).",hint:".loc: df.loc[df['Department']=='Engineering', ['Name','Salary']]. iloc: find column positions first.",solution:"# loc approach\nresult = df.loc[df['Department']=='Engineering', ['Name','Salary']]\n\n# iloc approach\nn_pos = df.columns.get_loc('Name')\ns_pos = df.columns.get_loc('Salary')\neng_rows = [df.index.get_loc(i) for i in df.index[df['Department']=='Engineering']]\nresult = df.iloc[eng_rows, [n_pos, s_pos]]"},
      {q:"Benchmark .at vs .loc accessing 100,000 single cells. Use time.time(). What speedup do you measure?",hint:"Loop 100k times with df.at[101,'Salary'] vs df.loc[101,'Salary']. Expect 3-10x speedup for .at.",solution:"import time\n\nstart = time.time()\nfor _ in range(100000):\n    _ = df.loc[101, 'Salary']\nprint(f'.loc: {time.time()-start:.3f}s')\n\nstart = time.time()\nfor _ in range(100000):\n    _ = df.at[101, 'Salary']\nprint(f'.at:  {time.time()-start:.3f}s')"}],
    experiments:[{title:"Exp 1: loc vs iloc row+col",desc:"Pick row and column position. See both loc and iloc in action.",inputs:[{id:"r",label:"Row pos (0-5)",val:"1",type:"number",w:"55px"},{id:"c",label:"Col pos (0-3)",val:"2",type:"number",w:"55px"}],runId:"idx_lociloc"}],
    mistakes:[{title:".loc with position on string index",wrong:"df.set_index('Name', inplace=True)\ndf.loc[0]   # KeyError -- 0 is not a name!",fix:"df.iloc[0]  # position-based, always works",why:"After <code>set_index('Name')</code>, index contains strings. <code>.loc[0]</code> searches for label <code>0</code> -- which does not exist. Use <code>.iloc[0]</code> for first row."},
      {title:"loc slicing is inclusive",wrong:"df.loc[101:103]   # 3 rows: 101,102,103 -- NOT 2 rows!",fix:"df.iloc[0:2]  # 2 rows: 0,1 (Python-style exclusive)",why:"<code>.loc</code> label slicing includes the stop value. <code>.iloc</code> follows Python convention -- exclusive stop."}],
  },
  {
    id:"filtering",
    icon:"FLT",
    title:"Conditional Filtering",
    desc:"Boolean indexing, isin(), query(), eval()",
    xpReward:65,
    chapter:3,
    subtopic:"3.4 Conditional Filtering",
    theory:[{title:"Boolean Indexing",content:"df[condition] where condition is a boolean Series. Pandas returns only rows where condition is True. It is SQL's WHERE clause.",analogy:"df[df['Salary']>100000] = SELECT * FROM df WHERE Salary > 100000",},
      {title:"Multiple Conditions -- Bitwise Operators",content:"Combine conditions with & (AND), | (OR), ~ (NOT). ALWAYS wrap each condition in parentheses.",points:["(df['age']>20) & (df['age']<50) -- AND","(df['dept']=='HR') | (df['dept']=='IT') -- OR","~(df['active']) -- NOT (invert boolean column)","Must use & and | not 'and' and 'or'"],},
      {title:"isin() -- Membership Filter",content:"df[df['dept'].isin(['HR','IT'])] -- keep rows where dept is HR or IT. Cleaner than multiple | conditions. Supports ~isin() for exclusion.",points:["df[df['city'].isin(['Mumbai','Delhi','Chennai'])]","df[~df['status'].isin(['cancelled','refunded'])]","Works on any dtype"],},
      {title:"query() -- SQL-like Syntax",content:"df.query('age > 30 and dept == \"IT\"') -- write filter as a string. More readable for complex conditions. Use @variable to inject Python variables.",points:["df.query('Salary > 100000') -- simple","df.query('Department == \"Engineering\" and Salary > 115000') -- compound","df.query('Department in [\"HR\",\"IT\"]') -- isin equivalent","df.query('Salary > @min_salary') -- Python variable with @"],},
      {title:"eval() -- Vectorised Expression",content:"df.eval('profit = revenue - cost') -- evaluate expressions and create new columns. Faster than standard Pandas for large DataFrames (uses Numexpr).",},
      {title:"str.contains() -- String Filtering",content:"df[df['Name'].str.contains('a', case=False)] -- filter rows where Name contains the letter 'a'. Supports regex patterns. Use na=False to handle NaN values.",},
      {title:"Use Cases",useCases:[{icon:"FRD",title:"Fraud Detection",body:"df[(df['amount']>10000) & (df['country']!='home') & (~df['verified'])]"},{icon:"EC",title:"E-commerce",body:"df[df['category'].isin(top_categories) & (df['rating']>=4.0)]"},{icon:"MED",title:"Clinical Trial",body:"df.query('age>=18 and age<=65 and condition==\"treated\"')"},{icon:"SLS",title:"Sales Report",body:"df.query('region==\"North\" and quarter==@current_q and revenue>@target')"}],}],
    code:"import pandas as pd\n\ndata = {\n    'Emp_ID':    [101,102,103,104,105,106],\n    'Name':      ['Alice','Bob','Charlie','David','Eve','Frank'],\n    'Department':['Engineering','HR','Engineering','Sales','Engineering','Sales'],\n    'Salary':    [120000,75000,110000,90000,130000,95000],\n    'Years_Exp': [5,3,4,2,8,3]\n}\ndf = pd.DataFrame(data)\ndf.set_index('Emp_ID', inplace=True)\n\n# Single condition\nprint(df[df['Salary'] > 100000])\n\n# AND\nhigh_eng = df[(df['Department']=='Engineering') & (df['Salary']>115000)]\nprint('\\nHigh-earning Engineers:')\nprint(high_eng)\n\n# OR\nprint(df[(df['Department']=='HR') | (df['Department']=='Sales')])\n\n# NOT -- inverse filter\nprint('\\nNOT Engineering (~):')\nprint(df[~(df['Department']=='Engineering')])\n\n# isin()\nprint(df[df['Department'].isin(['HR','Sales'])])\n\n# Exclude with ~isin\nprint(df[~df['Department'].isin(['Sales'])])\n\n# query() -- clean syntax\nprint(df.query('Department == \"Engineering\" and Salary > 115000'))\n\n# query with Python variable\nmin_sal = 100000\nprint(df.query('Salary >= @min_sal'))\n\n# eval() -- create column\ndf.eval('Salary_k = Salary / 1000', inplace=True)\nprint(df[['Name','Salary','Salary_k']])\n\n# str.contains() -- string filter\nprint(df[df['Name'].str.contains('a', case=False)])",
    purePython:{title:"Filtering without Pandas",comparisons:[{task:"Multi-condition filter",pyCode:"result = [\n  r for r in data\n  if r['Department'] == 'Engineering'\n  and r['Salary'] > 115000\n]\n# Still a list of dicts\n# No groupby, plot, describe",pdCode:"df[\n  (df['Department']=='Engineering') &\n  (df['Salary'] > 115000)\n]\n# Full DataFrame ready for\n# any further Pandas operation",verdict:"List comprehension works but returns dicts with no analysis capabilities. Pandas returns a filtered DataFrame with full querying power.",saved:"~50% fewer lines + chainable"},
        {task:"Filter using an external variable",pyCode:"min_sal = 100000\nresult = [r for r in data\n          if r['Salary'] >= min_sal]",pdCode:"min_sal = 100000\ndf.query('Salary >= @min_sal')\n# @ prefix injects Python variable\n# safely into query string",verdict:"query() with @variable is more readable and safely injects Python variables without string formatting (no injection risk).",saved:"Cleaner and safer"}]},
    quiz:[{q:"df[(df['Salary']>100000) & df['Years_Exp']>3] -- what is wrong without parentheses?",opts:["Nothing -- identical","& has higher precedence than > so it evaluates wrong","SyntaxError","Only works on integers"],correct:1,explain:"Python's & operator has HIGHER precedence than >. Without parentheses, df['Salary']>100000 & df['Years_Exp'] is parsed as df['Salary'] > (100000 & df['Years_Exp']). Silently wrong results, no error."},
      {q:"isin() vs multiple | conditions -- which is better?",opts:["| is faster","isin() is cleaner and scales better","Identical in every way","isin() only works with strings"],correct:1,explain:"Both produce identical results, but isin() is more readable and scalable. For 10 items, isin() stays clean while | creates 10 conditions. isin() is also slightly faster for long lists."},
      {q:"In .query(), how do you reference a Python variable 'threshold'?",opts:["query('col > threshold')","query('col > $threshold')","query('col > @threshold')","query(f'col > {threshold}')"],correct:2,explain:"Prefix with @ to inject Python variables into query strings. The f-string version works but is a security risk with user input."},
      {q:"~ operator in Pandas boolean indexing means:",opts:["Approximately equal to","Bitwise NOT -- inverts True/False","String contains","NaN"],correct:1,explain:"~ is bitwise NOT applied to a boolean Series. ~(df['active']) returns a Series where True becomes False and vice versa. Use ~ to invert any boolean condition."}],
    openChallenges:[{q:"From a sales DataFrame: filter region is 'North' OR 'East', AND revenue > 50000, AND product NOT in ['returns','cancelled']. Write it three ways: boolean mask, isin+mask, and query().",hint:"Combine &, |, ~isin(), and .query() with @variables.",solution:"# Boolean mask\ndf[\n  (df['region'].isin(['North','East'])) &\n  (df['revenue'] > 50000) &\n  (~df['product'].isin(['returns','cancelled']))\n]\n\n# query()\ndf.query(\n  'region in [\"North\",\"East\"]'\n  ' and revenue > 50000'\n  ' and product not in [\"returns\",\"cancelled\"]'\n)"},
      {q:"Create a boolean column 'is_senior' where Years_Exp >= 7. Filter to show only senior Engineering employees. Use eval() to create the column. Also try str.contains() to find names containing 'e'.",hint:"df.eval('is_senior = Years_Exp >= 7', inplace=True). Then filter. str.contains: df[df['Name'].str.contains('e', case=False)]",solution:"df.eval('is_senior = Years_Exp >= 7', inplace=True)\nsenior_eng = df[(df['is_senior']) & (df['Department']=='Engineering')]\nprint(senior_eng[['Name','Years_Exp','Salary']])\n\n# str.contains\nprint(df[df['Name'].str.contains('e', case=False)])"}],
    experiments:[{title:"Exp 1: Live boolean filter",desc:"Set salary threshold and toggle department filter.",inputs:[{id:"sal",label:"Min Salary",val:"100000",type:"number",w:"90px"},{id:"dept",label:"Dept filter (or 'all')",val:"all",type:"text",w:"130px"}],runId:"flt_bool"},
      {title:"Exp 2: isin filter",desc:"Type comma-separated department names.",inputs:[{id:"depts",label:"Departments",val:"Engineering,HR",type:"text",w:"180px"}],runId:"flt_isin"},
      {title:"Exp 3: str.contains",desc:"Filter names containing a letter or substring.",inputs:[{id:"substr",label:"Name contains",val:"a",type:"text",w:"80px"}],runId:"flt_contains"}],
    mistakes:[{title:"Using 'and'/'or' instead of '&'/'|'",wrong:"df[(df['Salary']>100000) and (df['Years_Exp']>3)]  # ValueError!",fix:"df[(df['Salary']>100000) & (df['Years_Exp']>3)]   # correct",why:"Python's <code>and</code>/<code>or</code> evaluate the truth of an entire Series at once, raising <code>ValueError: The truth value of a Series is ambiguous</code>. Use <code>&</code> and <code>|</code> for element-wise operations."},
      {title:"Missing parentheses in compound conditions",wrong:"df[df['Salary']>100000 & df['Years_Exp']>3]  # Wrong result, no error!",fix:"df[(df['Salary']>100000) & (df['Years_Exp']>3)]  # always parenthesise",why:"<code>&</code> has higher precedence than <code>></code>. Without parentheses, Python evaluates <code>100000 & df['Years_Exp']</code> first (wrong!) then compares. Silently wrong results -- one of Pandas' most dangerous gotchas."}],
  },
  {
    id:"duplicates",
    icon:"DUP",
    title:"Removing Duplicates",
    desc:"Find, inspect, and eliminate duplicate rows",
    xpReward:50,
    chapter:4,
    subtopic:"4.1 Duplicates",
    theory:[{title:"The Dataset: Messy Customer Records",content:"Throughout Chapter 4 we use a deliberately dirty customer dataset with 6 rows containing: exact duplicate rows, inconsistent name formatting (leading spaces, underscores, wrong case), sentinel values (-999 for missing age), 'N/A' strings as missing phone numbers, and currency symbols in a numeric column.",analogy:"This is real-world data: exported from a CRM, merged from two sources, or typed by hand across multiple people. Your job is to make it analysis-ready.",},
      {title:"Why Duplicates Are Dangerous",content:"Duplicate rows inflate counts, skew averages, double-count revenue, and corrupt model training. A 100k row dataset with 10% duplicates gives you 10,000 phantom records -- every aggregate is wrong.",analogy:"Imagine counting a classroom of 30 students but one student was accidentally registered twice. Every metric -- average marks, attendance rate, pass percentage -- is now wrong.",},
      {title:"drop_duplicates() parameters",points:["df.drop_duplicates() -- remove rows where ALL columns match","df.drop_duplicates(subset=['CustomerID']) -- match on specific columns only","keep='first' (default) -- keep the first occurrence","keep='last' -- keep the last occurrence","keep=False -- drop ALL occurrences of duplicates","df.duplicated() -- boolean Series: True where row is a duplicate"],},
      {title:"Checking Before Dropping",content:"Always inspect duplicates before removing them. Use df.duplicated().sum() to count. Use df[df.duplicated(keep=False)] to see all duplicate rows.",},
      {title:"Use Cases",useCases:[{icon:"CRM",title:"CRM Export",body:"Customer records merged from two systems -- same customer appears twice"},{icon:"API",title:"API Pagination",body:"Overlapping page ranges in API calls create duplicate records"},{icon:"LOG",title:"Event Logs",body:"Retry logic causes duplicate event inserts"},{icon:"ETL",title:"Data Pipeline",body:"Failed pipeline re-runs append instead of upsert"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'CustomerID': ['101','102','102','104','105','106'],\n    'Name':       ['Jane Doe','john smith','john smith',\n                   '  Alice Jones','Bob_Brown','Charlie'],\n    'Age':        [28,-999,-999,35,np.nan,42],\n    'Phone':      ['555-1234','555-5678','555-5678','N/A','555-9999','555-0000'],\n    'Purchase_Amt':['$150.50','$200.00','$200.00','$45.00','Free','$120.75']\n}\ndf = pd.DataFrame(data)\n\nprint('Original shape:', df.shape)\nprint('Duplicate rows:', df.duplicated().sum())\n\n# See the duplicates\nprint('\\nAll duplicate rows:')\nprint(df[df.duplicated(keep=False)])\n\n# Remove exact duplicates\ndf = df.drop_duplicates()\nprint('\\nAfter drop_duplicates():', df.shape)\nprint(df)\n\n# Keep LAST occurrence instead of first\ndf2 = df.drop_duplicates(keep='last')\n\n# Subset -- drop if CustomerID matches, even if other cols differ\ndf3 = df.drop_duplicates(subset=['CustomerID'])",
    purePython:{title:"Deduplication without Pandas",comparisons:[{task:"Remove exact duplicate rows from a list of dicts",pyCode:"seen = set()\nclean = []\nfor row in data:\n    key = tuple(sorted(row.items()))\n    if key not in seen:\n        seen.add(key)\n        clean.append(row)\n\n# 7 lines -- breaks on unhashable\n# values (lists, dicts inside)",pdCode:"df.drop_duplicates()\n# Works on any dtype\n# subset=, keep= options\n# Returns a proper DataFrame",verdict:"Pure Python requires hashing row tuples -- breaks on nested structures. Pandas handles all dtypes, subset filtering, and keep modes in one method call.",saved:"~85% fewer lines"},
        {task:"Find which rows are duplicates",pyCode:"seen = set()\nresult = []\nfor row in data:\n    key = tuple(sorted(row.items()))\n    result.append(key in seen)\n    seen.add(key)\n# True/False per row -- clunky",pdCode:"df.duplicated()          # boolean Series\ndf.duplicated().sum()    # count\ndf[df.duplicated(keep=False)]  # see them",verdict:"Pandas duplicated() returns a boolean Series that plugs directly into filters, counts, and visualisations. No manual bookkeeping needed.",saved:"~80% fewer lines"}]},
    quiz:[{q:"df.duplicated().sum() returns 3. What does this mean?",opts:["3 unique rows exist","3 rows are exact copies of a previous row","3 columns have duplicates","The index has 3 duplicates"],correct:1,explain:"duplicated() marks the SECOND and subsequent occurrence as True (keep='first' default). .sum() counts True values -- so 3 rows were already seen earlier in the DataFrame."},
      {q:"drop_duplicates(subset=['CustomerID'], keep='last') keeps which Charlie when there are two with CustomerID=106?",opts:["First Charlie (row 0)","Last Charlie (last row)","Both Charlies","Neither -- both dropped"],correct:1,explain:"keep='last' retains the LAST occurrence of each duplicate group. So the second Charlie (last row) is kept and the first is dropped."},
      {q:"drop_duplicates(keep=False) does what?",opts:["Keeps first occurrence","Removes ALL rows involved in duplication","Keeps last occurrence","Raises an error"],correct:1,explain:"keep=False removes ALL occurrences -- both the original and the duplicate. Use this when you want to work only with rows that are definitively unique."},
      {q:"df[df.duplicated(keep=False)] shows:",opts:["Only the second occurrence","Only the first occurrence","ALL rows involved in any duplication","Rows with NaN"],correct:2,explain:"keep=False marks BOTH occurrences as True. Filtering on this shows you the complete picture of all duplicate pairs/groups."}],
    openChallenges:[{q:"Add a new row: CustomerID=106, Name=Charlie, Age=42, Phone=555-0000, Purchase_Amt=$120.75. Run drop_duplicates(subset=['CustomerID']). Which Charlie is kept and why?",hint:"Default keep='first'. The original row 5 (Charlie) was there first. The new row appended last gets dropped.",solution:"new_row = {'CustomerID':'106','Name':'Charlie','Age':42,'Phone':'555-0000','Purchase_Amt':'$120.75'}\ndf_new = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)\ndf_new.drop_duplicates(subset=['CustomerID'])\n# First Charlie kept -- keep='first' default"},
      {q:"Write a function audit_duplicates(df) that prints: total duplicate count, which columns have the most duplicate values (using nunique), and a preview of the duplicate rows.",hint:"df.duplicated().sum() for count. df.nunique() for column uniqueness. df[df.duplicated(keep=False)] for preview.",solution:"def audit_duplicates(df):\n    dup_count = df.duplicated().sum()\n    print(f'Duplicate rows: {dup_count}')\n    print('\\nUnique values per column:')\n    print(df.nunique())\n    if dup_count:\n        print('\\nDuplicate rows preview:')\n        print(df[df.duplicated(keep=False)])"}],
    experiments:[{title:"Exp 1: keep= explorer",desc:"See how keep='first', 'last', and False affect which rows survive.",inputs:[{id:"keep",label:"keep=",val:"first",type:"text",w:"80px"}],runId:"dup_keep"},
      {title:"Exp 2: subset= selector",desc:"Deduplicate on a specific column. See how shape changes.",inputs:[{id:"col",label:"subset column",val:"CustomerID",type:"text",w:"120px"}],runId:"dup_subset"}],
    mistakes:[{title:"Forgetting to reassign after drop_duplicates",wrong:"df.drop_duplicates()  # result lost! df unchanged\nprint(df.shape)       # still has duplicates",fix:"df = df.drop_duplicates()          # reassign\n# OR:\ndf.drop_duplicates(inplace=True)  # modify in-place",why:"Like most Pandas operations, <code>drop_duplicates()</code> returns a NEW DataFrame by default. The original is unchanged. Always reassign or use <code>inplace=True</code>."},
      {title:"Trusting drop_duplicates to fix your key logic",wrong:"df.drop_duplicates()  # row 102 still exists once\n# But WHICH john smith data is correct?",fix:"# Inspect BEFORE dropping:\nprint(df[df.duplicated(keep=False)])\n# Decide: are the duplicates truly identical?\n# Or does the second row have updated data?",why:"Blindly dropping duplicates can remove the more RECENT or CORRECT record. Always inspect the duplicates first. Sometimes the right fix is to merge the rows, not drop one."}],
  },
  {
    id:"string_cleaning",
    icon:"STR",
    title:"String Cleaning",
    desc:"strip, replace, title, split -- tame messy text",
    xpReward:55,
    chapter:4,
    subtopic:"4.2 String Cleaning",
    theory:[{title:"The .str Accessor",content:"df['col'].str gives you a namespace of string methods applied element-wise across the whole column. Each .str method corresponds to a Python string method. Chain them left to right.",analogy:"Think of .str as putting every cell on the conveyor belt at once. Each chained method is a tool the belt passes through: first a washer (.strip()), then a cutter (.replace()), then a stamper (.title()).",},
      {title:"Essential .str methods",points:[".str.strip() -- remove leading/trailing whitespace",".str.lstrip() / .str.rstrip() -- left or right only",".str.lower() / .str.upper() / .str.title() -- case",".str.replace('_',' ') -- character substitution",".str.replace(r'^\\$','',regex=True) -- regex substitution",".str.contains('pat') -- boolean mask (case-sensitive by default)",".str.startswith() / .str.endswith() -- prefix/suffix checks",".str.split(',') -- split on delimiter -> list column",".str.split(',', expand=True) -- split into multiple columns",".str.len() -- length of each string",".str.count('a') -- count occurrences of pattern",".str.extract(r'(\\d+)') -- regex capture group -> new column"],},
      {title:"str.replace vs Python replace",content:"df['col'].str.replace() has regex=True by default in older Pandas (changed in 2.0 to False). Always pass regex=True or regex=False explicitly to avoid warnings and bugs.",},
      {title:"Handling NaN in .str operations",content:"By default, .str methods propagate NaN -- NaN in = NaN out. Use na=False in str.contains() to return False instead of NaN for missing values.",},
      {title:"Use Cases",useCases:[{icon:"CSV",title:"CSV Imports",body:"Headers from Excel: '  First Name  ' -> strip -> lower -> replace space with underscore"},{icon:"WEB",title:"Web Scraping",body:"Prices as '$1,234.50\\n' -> strip, replace $, replace comma -> float"},{icon:"EML",title:"Email Validation",body:"str.contains(r'^[\\w.-]+@[\\w.-]+\\.\\w+$', regex=True) -> filter invalid emails"},{icon:"ID",title:"ID Parsing",body:"'EMP-101-GUW' -> str.split('-', expand=True) -> separate columns"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'CustomerID': ['101','102','102','104','105','106'],\n    'Name':       ['Jane Doe','john smith','john smith',\n                   '  Alice Jones','Bob_Brown','Charlie'],\n    'Age':        [28,-999,-999,35,np.nan,42],\n    'Phone':      ['555-1234','555-5678','555-5678','N/A','555-9999','555-0000'],\n    'Purchase_Amt':['$150.50','$200.00','$200.00','$45.00','Free','$120.75']\n}\ndf = pd.DataFrame(data).drop_duplicates().reset_index(drop=True)\n\n# Chain: strip whitespace, replace underscores, title case\ndf['Name'] = df['Name'].str.strip().str.replace('_',' ').str.title()\nprint('Cleaned names:')\nprint(df['Name'])\n\n# Check phone contains only digits and hyphens\ndf['Phone_Valid'] = df['Phone'].str.contains(r'^[0-9-]+$', regex=True, na=False)\nprint('\\nPhone valid:')\nprint(df[['Name','Phone','Phone_Valid']])\n\n# Extract area code (first 3 digits)\ndf['Area'] = df['Phone'].str.extract(r'^(\\d{3})', expand=False)\n\n# Normalise CustomerID -- pad to 4 digits: 101 -> C0101\ndf['CID_Fmt'] = 'C' + df['CustomerID'].str.zfill(4)\nprint('\\nFormatted IDs:')\nprint(df['CID_Fmt'])\n\n# Split name into first and last\nname_split = df['Name'].str.split(' ', expand=True)\ndf['First'] = name_split[0]\ndf['Last']  = name_split[1]\nprint(df[['Name','First','Last']])",
    purePython:{title:"String cleaning without Pandas",comparisons:[{task:"Strip, replace underscores, title-case a name column",pyCode:"cleaned = []\nfor name in names:\n    if name is None:\n        cleaned.append(None)\n    else:\n        cleaned.append(\n            name.strip()\n                .replace('_',' ')\n                .title()\n        )\n# Still a plain list",pdCode:"df['Name'].str.strip()\n         .str.replace('_',' ')\n         .str.title()\n# Returns a Series\n# NaN propagated automatically",verdict:"Pure Python requires an explicit loop and manual NaN handling. Pandas chains .str methods identically to Python string methods but on the whole column, with NaN propagation built in.",saved:"~70% fewer lines"},
        {task:"Extract area code from phone numbers",pyCode:"import re\nareas = []\nfor phone in phones:\n    m = re.search(r'^(\\d{3})', str(phone))\n    areas.append(m.group(1) if m else None)",pdCode:"df['Phone'].str.extract(\n    r'^(\\d{3})',\n    expand=False\n)",verdict:"str.extract() runs the regex on every row and returns a Series (or DataFrame with multiple capture groups) directly. No loop, no manual None handling.",saved:"~75% fewer lines"}]},
    quiz:[{q:"df['Name'].str.strip() vs df['Name'].str.strip() + '' -- what is different?",opts:["Identical","+ '' creates a copy which persists; .strip() alone is lost unless reassigned","+ '' raises TypeError","strip() removes all whitespace; + '' adds it back"],correct:1,explain:"BOTH return new objects without modifying df. The key insight: you must reassign: df['Name'] = df['Name'].str.strip(). Without reassignment, the result is computed and thrown away."},
      {q:"str.contains('alice', case=False, na=False) -- what does na=False do?",opts:["Drops NaN rows","Returns False instead of NaN for missing values","Raises error on NaN","Fills NaN with 'alice'"],correct:1,explain:"By default str.contains() returns NaN where the input is NaN. na=False returns False instead, which is often what you want for boolean filters."},
      {q:"str.replace('$', '', regex=False) vs str.replace('$', '') -- difference in Pandas 2.0?",opts:["Identical","regex=False avoids interpreting '$' as regex end-of-string anchor -- safer","regex=True is faster","str.replace in Pandas does not support regex"],correct:1,explain:"'$' is a regex metacharacter (end of string). In older Pandas regex=True by default -- '$' as a pattern matches end-of-string, not the literal '$'. Always pass regex=False for literal replacements."},
      {q:"str.split('-', expand=True) returns:",opts:["A list column","A new DataFrame with one column per split part","A Series of lists","An error if any row has different split counts"],correct:1,explain:"expand=True expands the split into separate columns of a DataFrame. Rows with fewer parts get NaN in the extra columns. expand=False (default) returns a Series of lists."}],
    openChallenges:[{q:"The Phone column has values like '555-1234' and 'N/A'. Write code to: (a) replace 'N/A' with NaN, (b) remove the hyphen from valid phones, (c) check all remaining non-null phones are exactly 7 digits.",hint:"(a) df.replace('N/A', np.nan). (b) str.replace('-','',regex=False). (c) str.match(r'^\\d{7}$', na=False)",solution:"import numpy as np\ndf['Phone'] = df['Phone'].replace('N/A', np.nan)\ndf['Phone'] = df['Phone'].str.replace('-','',regex=False)\ndf['Phone_OK'] = df['Phone'].str.match(r'^\\d{7}$', na=False)\nprint(df[['Name','Phone','Phone_OK']])"},
      {q:"Given a column of employee IDs like 'EMP-101-GUW', 'EMP-204-DEL', extract: the numeric ID (101, 204) as an integer column, and the city code (GUW, DEL) as a string column.",hint:"str.split('-', expand=True) gives 3 columns. Or str.extract(r'EMP-(\\d+)-([A-Z]+)') captures both groups at once.",solution:"split = df['EmpID'].str.split('-', expand=True)\ndf['num_id'] = split[1].astype(int)\ndf['city'] = split[2]\n# Or:\nextracted = df['EmpID'].str.extract(r'EMP-(\\d+)-([A-Z]+)')\ndf['num_id'] = extracted[0].astype(int)\ndf['city'] = extracted[1]"}],
    experiments:[{title:"Exp 1: String chain builder",desc:"Apply strip + replace + case. See the cleaned name.",inputs:[{id:"name",label:"Name to clean",val:"  bob_smith  ",type:"text",w:"160px"},{id:"case",label:"Case (title/lower/upper)",val:"title",type:"text",w:"90px"}],runId:"str_clean"},
      {title:"Exp 2: str.contains filter",desc:"Enter a pattern. See which names match.",inputs:[{id:"pat",label:"Pattern",val:"alice",type:"text",w:"110px"},{id:"case_s",label:"Case sensitive?",val:"no",type:"text",w:"60px"}],runId:"str_contains"}],
    mistakes:[{title:"Forgetting to reassign -- the silent no-op",wrong:"df['Name'].str.lower()  # computed and discarded!\nprint(df['Name'])       # still original case",fix:"df['Name'] = df['Name'].str.lower()  # reassign\n# OR in a pipeline use .assign():\ndf = df.assign(Name=df['Name'].str.lower())",why:"Pandas string operations return new objects. The original column is never modified. You MUST capture the result. This is the single most common mistake with .str methods."},
      {title:"regex=True treating $ as end-of-string",wrong:"df['Price'].str.replace('$','')  # removes NOTHING!\n# '$' matches end-of-string in regex",fix:"df['Price'].str.replace('$','',regex=False)  # literal $",why:"In regex, <code>$</code> means end-of-string. As a pattern it matches the empty string at the end, so replacing it removes nothing. Always use <code>regex=False</code> for literal character replacement."}],
  },
  {
    id:"missing_values",
    icon:"NaN",
    title:"Missing & Sentinel Values",
    desc:"replace(), fillna(), dropna() -- handle NaN properly",
    xpReward:60,
    chapter:4,
    subtopic:"4.3 Missing Values",
    theory:[{title:"NaN vs Sentinel Values",content:"NaN (Not a Number) is Pandas' standard representation of missing numeric data. But real datasets often encode missing data as -999, 99, 'N/A', 'None', '--', or 0. You must convert sentinels to NaN before any analysis.",analogy:"A weather station logs -999 when the sensor fails. Average temperature including -999 gives absurd results. First step: replace -999 with NaN so Pandas knows to skip it.",},
      {title:"Detecting Missing Values",points:["df.isna() / df.isnull() -- boolean DataFrame (isna is preferred alias)","df.isna().sum() -- count of NaN per column","df.isna().sum() / len(df) -- proportion missing","df.isna().any() -- True if ANY NaN in column","df[df['col'].isna()] -- rows where col is missing"],},
      {title:"Converting Sentinels to NaN",points:["df.replace(-999, np.nan) -- single value","df.replace([-999, 'N/A', '--', 'None'], np.nan) -- list","df.replace({'Age':{-999:np.nan}, 'Phone':{'N/A':np.nan}}) -- dict of dicts","pd.to_numeric(df['col'], errors='coerce') -- non-numeric -> NaN","na_values=['-999','N/A'] in pd.read_csv() -- handle at load time"],},
      {title:"Filling Missing Values",points:["df['col'].fillna(0) -- fill with constant","df['col'].fillna(df['col'].mean()) -- fill with column mean","df['col'].fillna(method='ffill') -- forward fill (use previous value)","df['col'].fillna(method='bfill') -- backward fill (use next value)","df.fillna({'Age':df['Age'].mean(), 'Phone':'Unknown'}) -- per-column","df['col'].interpolate() -- linear interpolation (good for time series)"],},
      {title:"Dropping Missing Values",points:["df.dropna() -- drop ANY row with ANY NaN","df.dropna(subset=['Age','Phone']) -- drop only if these cols have NaN","df.dropna(thresh=3) -- keep rows with at least 3 non-NaN values","df.dropna(axis=1) -- drop columns with any NaN"],},
      {title:"Use Cases",useCases:[{icon:"SCI",title:"Sensor Data",body:"-999 sentinel -> NaN -> interpolate() to fill gaps"},{icon:"SRV",title:"Survey Data",body:"'Prefer not to say' -> NaN -> dropna(subset=['age']) for age-specific analysis"},{icon:"FIN",title:"Financial",body:"Missing Q3 revenue -> ffill() from Q2 for provisional reporting"},{icon:"ML",title:"ML Pipeline",body:"NaN in features causes model errors -> fillna(mean) or imputer"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'CustomerID': ['101','102','102','104','105','106'],\n    'Name':       ['Jane Doe','john smith','john smith',\n                   '  Alice Jones','Bob_Brown','Charlie'],\n    'Age':        [28,-999,-999,35,np.nan,42],\n    'Phone':      ['555-1234','555-5678','555-5678','N/A','555-9999','555-0000'],\n    'Purchase_Amt':['$150.50','$200.00','$200.00','$45.00','Free','$120.75']\n}\ndf = pd.DataFrame(data).drop_duplicates().reset_index(drop=True)\n\n# Step 1: Inspect missing\nprint('Missing per column:')\nprint(df.isna().sum())\nprint('\\nSentinel -999 present:', (df['Age']==-999).sum())\n\n# Step 2: Replace sentinels with NaN\ndf.replace([-999, 'N/A'], np.nan, inplace=True)\nprint('\\nAfter sentinel replacement:')\nprint(df.isna().sum())\n\n# Step 3: Fill Age with mean\nprint('\\nMean age (excl NaN):', df['Age'].mean().round(2))\ndf['Age'] = df['Age'].fillna(df['Age'].mean())\n\n# Forward fill Phone\ndf['Phone'] = df['Phone'].fillna(method='ffill')\nprint('\\nAfter fillna:')\nprint(df[['Name','Age','Phone']])\n\n# dropna on specific subset\ndf_clean = df.dropna(subset=['Phone'])\nprint('\\nAfter dropna(subset=[Phone]):', df_clean.shape)",
    purePython:{title:"Missing value handling without Pandas",comparisons:[{task:"Replace sentinel -999 with None and compute mean of valid values",pyCode:"SENTINEL = -999\nclean_ages = [a for a in ages\n              if a != SENTINEL and a is not None]\n\nmean_age = sum(clean_ages) / len(clean_ages)\n\n# Now impute\nimputed = [mean_age if (a==SENTINEL or a is None)\n           else a for a in ages]",pdCode:"df['Age'].replace(-999, np.nan, inplace=True)\nmean_age = df['Age'].mean()  # skips NaN\ndf['Age'] = df['Age'].fillna(mean_age)",verdict:"Pure Python: two list comprehensions, manual sentinel detection, manual mean computation. Pandas: three method calls. Pandas also handles float/int NaN consistently where Python None can cause type errors.",saved:"~70% fewer lines"},
        {task:"Forward fill missing values (use previous row's value)",pyCode:"last_valid = None\nfilled = []\nfor val in data:\n    if val is None or val != val:  # NaN check\n        filled.append(last_valid)\n    else:\n        last_valid = val\n        filled.append(val)",pdCode:"df['col'].fillna(method='ffill')",verdict:"Forward fill by hand requires stateful iteration -- track last valid. Pandas ffill does this in one line. For bfill (backward fill), pure Python would need to reverse twice.",saved:"~85% fewer lines"}]},
    quiz:[{q:"df['Age'].mean() is computed AFTER replacing -999 with NaN. Why does mean() skip NaN automatically?",opts:["mean() drops all rows first","NumPy and Pandas aggregate functions skip NaN by default","You must pass skipna=True","mean() converts NaN to 0"],correct:1,explain:"Pandas aggregation functions (mean, sum, std, etc.) have skipna=True by default. This is intentional -- NaN means 'unknown', so it's excluded from calculations. Pass skipna=False to include them (result will be NaN)."},
      {q:"fillna(method='ffill') on the first row if it's NaN does what?",opts:["Raises ValueError","Fills with column mean","Leaves NaN -- no previous value to forward-fill from","Fills with 0"],correct:2,explain:"ffill propagates the PREVIOUS valid value. If the first value is NaN, there's no previous -- it stays NaN. Use bfill or fillna(constant) to handle leading NaN."},
      {q:"dropna(thresh=3) on a 5-column DataFrame keeps rows with:",opts:["Fewer than 3 NaN values","At least 3 non-NaN values","Exactly 3 NaN values","3 or more NaN values"],correct:1,explain:"thresh=N keeps rows with AT LEAST N non-NaN values. thresh=3 keeps rows that have data in at least 3 of 5 columns. Rows with data in only 1 or 2 columns are dropped."},
      {q:"Best approach to handle missing values in a time series temperature column?",opts:["dropna() -- remove gaps","fillna(0) -- zero is a valid temperature","interpolate() -- linear interpolation between neighbours","fillna(mean()) -- fill with overall average"],correct:2,explain:"interpolate() fills gaps using linear interpolation between adjacent known values -- the most physically meaningful approach for continuous measurements. dropna removes observations, fillna(0) is wrong (0 is a real temp), mean distorts trends."}],
    openChallenges:[{q:"After replacing -999 with NaN, use fillna(method='ffill') for Age instead of mean. Predict Bob Brown's age. Does this make sense for this dataset? When would ffill be inappropriate?",hint:"ffill gives Bob the age of the row above him (Alice=35). Ffill makes no sense for demographic data where adjacent rows are unrelated customers.",solution:"df['Age'].replace(-999, np.nan, inplace=True)\ndf['Age'] = df['Age'].fillna(method='ffill')\n# Bob Brown gets 35 (Alice's age above him)\n# This is WRONG for customer data -- rows are independent\n# ffill makes sense for: time series, sensor readings\n# NOT for: customer records, survey responses"},
      {q:"Write a function missing_report(df) that prints: percentage missing per column (sorted descending), columns with over 20% missing, and recommended action (drop column vs impute).",hint:"(df.isna().sum()/len(df)*100).sort_values(ascending=False) for percentages. Filter > 20% for flagging.",solution:"def missing_report(df):\n    pct = (df.isna().sum()/len(df)*100).sort_values(ascending=False)\n    print('Missing % per column:')\n    print(pct.round(1))\n    high_missing = pct[pct > 20]\n    for col, p in high_missing.items():\n        action = 'Consider dropping' if p > 50 else 'Impute with mean/mode'\n        print(f'{col}: {p:.0f}% missing -- {action}')"}],
    experiments:[{title:"Exp 1: fillna strategy explorer",desc:"Choose a fill strategy and see how Age column changes.",inputs:[{id:"strategy",label:"Strategy (mean/ffill/bfill/zero)",val:"mean",type:"text",w:"130px"}],runId:"nan_fill"},
      {title:"Exp 2: sentinel replacer",desc:"Enter a sentinel value to replace with NaN.",inputs:[{id:"sentinel",label:"Sentinel value",val:"-999",type:"text",w:"80px"}],runId:"nan_sentinel"}],
    mistakes:[{title:"Computing mean BEFORE replacing sentinels",wrong:"mean_age = df['Age'].mean()  # includes -999!\n# mean of [28,-999,-999,35,NaN,42] = -315.8\ndf['Age'].fillna(mean_age)   # wrong fill value!",fix:"df['Age'].replace(-999, np.nan, inplace=True)\nmean_age = df['Age'].mean()  # now correctly ~35",why:"-999 is a valid number to Pandas until you tell it otherwise. Always replace sentinels with NaN FIRST, then compute statistics. Otherwise your mean, std, min, max are all contaminated."},
      {title:"Casting column with NaN to int",wrong:"df['Age'].fillna(35).astype(int)  # OK\ndf['Age'].astype(int)  # ValueError if any NaN remain!",fix:"df['Age'] = df['Age'].fillna(df['Age'].mean()).astype(int)\n# OR use nullable integer type:\ndf['Age'] = df['Age'].astype('Int64')  # capital I",why:"NumPy int64 cannot represent NaN (it is a float concept). Fill all NaN before casting, or use Pandas' <code>Int64</code> extension type which supports NA natively."}],
  },
  {
    id:"type_conversion",
    icon:"TYP",
    title:"Type Conversion & Coercion",
    desc:"to_numeric, astype, to_datetime -- fix wrong dtypes",
    xpReward:65,
    chapter:4,
    subtopic:"4.4 Type Conversion",
    theory:[{title:"Why dtypes Matter",content:"Pandas reads ambiguous data as 'object' (string). Math on strings fails. Sorting strings gives '1','10','2' not '1','2','10'. Fix dtypes before analysis -- they determine what operations are possible.",analogy:"A column of ages stored as strings is like measuring weights in centimetres. The data is there but every operation gives nonsense. dtype is the unit system.",},
      {title:"pd.to_numeric()",content:"Converts a column to numeric. The errors parameter controls what happens with values that cannot be converted.",points:["errors='raise' (default) -- raises ValueError on first bad value","errors='coerce' -- bad values become NaN (most useful for cleaning)","errors='ignore' -- leaves non-numeric as-is, column stays object","pd.to_numeric(df['col'], errors='coerce') -- the cleaning standard","downcast='integer' -- use smallest possible int type (saves memory)"],},
      {title:"astype() -- Direct Casting",content:"df['col'].astype(dtype) for straightforward conversions when you are confident the data is clean.",points:["astype(int) / astype(float) / astype(str)","astype('category') -- for low-cardinality string columns","astype('Int64') -- nullable integer (supports NaN)","astype('datetime64[ns]') -- dates (prefer pd.to_datetime instead)","astype(bool) -- 0=False, nonzero=True"],},
      {title:"pd.to_datetime()",content:"Converts strings or numbers to datetime objects. Pandas auto-detects most common formats. Specify format= for speed and certainty.",points:["pd.to_datetime(df['date']) -- auto detect","pd.to_datetime(df['date'], format='%d/%m/%Y') -- explicit","pd.to_datetime(df['date'], errors='coerce') -- bad dates -> NaT","df['date'].dt.year / .dt.month / .dt.day -- extract components","df['date'].dt.dayofweek -- 0=Monday ... 6=Sunday"],},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Finance",body:"Revenue loaded as '$1,234.50' object -> strip $ and , -> to_numeric"},{icon:"DT",title:"Time Series",body:"'2024-01-15' string dates -> to_datetime -> .dt.month for monthly groupby"},{icon:"CAT",title:"Categories",body:"'region' with 5 unique values loaded as object -> astype('category') saves 90% RAM"},{icon:"ML",title:"ML Features",body:"Boolean 'churned' column as Yes/No strings -> map({'Yes':1,'No':0}) -> int"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'CustomerID': ['101','102','102','104','105','106'],\n    'Name':       ['Jane Doe','john smith','john smith',\n                   '  Alice Jones','Bob_Brown','Charlie'],\n    'Age':        [28,-999,-999,35,np.nan,42],\n    'Phone':      ['555-1234','555-5678','555-5678','N/A','555-9999','555-0000'],\n    'Purchase_Amt':['$150.50','$200.00','$200.00','$45.00','Free','$120.75']\n}\ndf = pd.DataFrame(data).drop_duplicates().reset_index(drop=True)\ndf.replace([-999,'N/A'], np.nan, inplace=True)\ndf['Name'] = df['Name'].str.strip().str.replace('_',' ').str.title()\n\nprint('Before conversion:')\nprint(df.dtypes)\n\n# Step 1: Strip $ sign from Purchase_Amt\ndf['Purchase_Amt'] = df['Purchase_Amt'].str.replace('$','',regex=False)\n\n# Step 2: Coerce non-numeric ('Free') to NaN\ndf['Purchase_Amt'] = pd.to_numeric(df['Purchase_Amt'], errors='coerce')\n\n# Step 3: CustomerID string -> int\ndf['CustomerID'] = df['CustomerID'].astype(int)\n\n# Step 4: Age -> fill then int\ndf['Age'] = df['Age'].fillna(df['Age'].mean()).astype(int)\n\nprint('\\nAfter conversion:')\nprint(df.dtypes)\nprint('\\nFinal clean dataset:')\nprint(df)",
    purePython:{title:"Type coercion without Pandas",comparisons:[{task:"Convert a column of mixed strings/numbers to float, skipping bad values",pyCode:"result = []\nfor val in purchase_col:\n    clean = str(val).replace('$','').strip()\n    try:\n        result.append(float(clean))\n    except ValueError:\n        result.append(None)  # or np.nan",pdCode:"df['Purchase_Amt'].str.replace(\n    '$','', regex=False\n)\npd.to_numeric(\n    df['Purchase_Amt'],\n    errors='coerce'\n)",verdict:"Pure Python requires try/except per row -- brittle, verbose, and returns a list not a Series. to_numeric with errors='coerce' handles the entire column in one vectorised operation.",saved:"~80% fewer lines"},
        {task:"Parse date strings into date objects",pyCode:"from datetime import datetime\ndates = []\nfor d in date_strings:\n    try:\n        dates.append(\n            datetime.strptime(d,'%Y-%m-%d')\n        )\n    except:\n        dates.append(None)",pdCode:"pd.to_datetime(\n    df['date'],\n    format='%Y-%m-%d',\n    errors='coerce'\n)\n# Then: df['date'].dt.year etc.",verdict:"pd.to_datetime parses dates and gives you the entire .dt accessor (year, month, day, dayofweek, quarter) for free. Pure Python gives bare datetime objects with no vectorised accessors.",saved:"~75% fewer lines + .dt accessor"}]},
    quiz:[{q:"pd.to_numeric('Free', errors='coerce') returns:",opts:["ValueError","0","NaN","'Free' unchanged"],correct:2,explain:"errors='coerce' converts unparseable values to NaN silently. This is the standard for dirty data. errors='raise' would throw ValueError. errors='ignore' would return 'Free' as-is."},
      {q:"df['col'].astype(int) when col has NaN raises:",opts:["Returns 0 for NaN","Silently ignores NaN","ValueError -- int64 cannot represent NaN","Works fine if you use int32"],correct:2,explain:"NumPy int64 (and int32) cannot represent NaN -- it is a float concept. Fill NaN first, or use Pandas nullable 'Int64' (capital I) which supports pd.NA."},
      {q:"Which saves the most memory for a column with 5 unique strings across 1M rows?",opts:["object","str","category","string"],correct:2,explain:"'category' dtype stores the 5 unique values once and uses integer codes (1 byte each) for all 1M rows. vs 'object' which stores a full Python string object per row -- potentially 50+ bytes each."},
      {q:"df['date'].dt.dayofweek returns 0 for:",opts:["Sunday","Saturday","Monday","Friday"],correct:2,explain:"Pandas follows ISO convention: Monday=0, Tuesday=1, ... Sunday=6. Not the Excel convention (Sunday=1). Always check with a known date when building day-of-week filters."}],
    openChallenges:[{q:"The Purchase_Amt column has '$150.50', '$200.00', 'Free'. Convert to float, set 'Free' to 0 (it was a promotional purchase, not missing). Do NOT use coerce -- use replace instead.",hint:"First replace 'Free' with '0'. Then strip '$'. Then astype(float). No errors='coerce' needed because all values are now numeric strings.",solution:"df['Purchase_Amt'] = df['Purchase_Amt'].replace('Free','0')\ndf['Purchase_Amt'] = df['Purchase_Amt'].str.replace('$','',regex=False)\ndf['Purchase_Amt'] = df['Purchase_Amt'].astype(float)\nprint(df['Purchase_Amt'])  # 0.0 for Bob, not NaN"},
      {q:"A CSV has a 'signup_date' column as '15/01/2024'. Convert to datetime, extract: year, month, day, and day-of-week name (Monday, Tuesday...). Filter to only weekend signups.",hint:"pd.to_datetime(df['signup_date'], format='%d/%m/%Y'). Then .dt.year, .dt.month. For day name: .dt.day_name(). Weekend: dt.dayofweek >= 5",solution:"df['signup_date'] = pd.to_datetime(df['signup_date'], format='%d/%m/%Y')\ndf['year'] = df['signup_date'].dt.year\ndf['month'] = df['signup_date'].dt.month\ndf['day_name'] = df['signup_date'].dt.day_name()\nweekends = df[df['signup_date'].dt.dayofweek >= 5]\nprint(weekends[['signup_date','day_name']])"}],
    experiments:[{title:"Exp 1: to_numeric error modes",desc:"See how errors='coerce', 'raise', and 'ignore' behave.",inputs:[{id:"mode",label:"errors=",val:"coerce",type:"text",w:"90px"}],runId:"typ_errors"},
      {title:"Exp 2: dtype memory comparison",desc:"Compare object vs category memory for N unique values.",inputs:[{id:"uniq",label:"Unique values",val:"5",type:"number",w:"60px"},{id:"rows",label:"Total rows",val:"1000000",type:"number",w:"90px"}],runId:"typ_memory"}],
    mistakes:[{title:"str.replace('$','') without regex=False",wrong:"df['Price'].str.replace('$','')   # may silently do nothing!\n# '$' is regex end-of-line anchor",fix:"df['Price'].str.replace('$','', regex=False)  # literal '$'",why:"'$' is a regex metacharacter. Without regex=False, it matches end-of-string (an empty position), so replacing it with '' changes nothing visible. Always use regex=False for literal character replacement."},
      {title:"errors='ignore' leaves column as object",wrong:"df['col'] = pd.to_numeric(df['col'], errors='ignore')\ndf['col'].mean()  # TypeError: can't operate on object!",fix:"df['col'] = pd.to_numeric(df['col'], errors='coerce')\n# NaN for bad values, numeric for good values\n# Mean skips NaN automatically",why:"errors='ignore' returns the ORIGINAL object if conversion fails -- the column stays as 'object' dtype. errors='coerce' gives you NaN for bad values and real numbers for good ones -- the column becomes numeric."}],
  },
  {
    id:"concat",
    icon:"CAT",
    title:"Concatenation",
    desc:"Stack DataFrames vertically or horizontally with pd.concat()",
    xpReward:50,
    chapter:5,
    subtopic:"5.1 Concatenation",
    theory:[{title:"The Dataset: Quarterly Sales Tables",content:"Throughout Chapter 5 we use three related datasets: sales_q1 (Alice/Bob/Charlie, Q1 sales), sales_q2 (Alice/Charlie/David, Q2 sales), and a regions table (Rep_ID -> Region mapping). This mirrors how real business data arrives -- chunked by time period, stored in separate tables that must be combined.",analogy:"Imagine getting January, February, and March sales exports as separate CSV files. Concatenation stacks them into one master table. Merge links them to a customer database by ID.",},
      {title:"pd.concat() -- Stacking DataFrames",content:"pd.concat() stacks objects along an axis. axis=0 (default) stacks rows. axis=1 stacks columns side by side. Works on any number of DataFrames at once.",points:["pd.concat([df1, df2]) -- vertical stack (rows)","pd.concat([df1, df2], ignore_index=True) -- reset index to 0,1,2...","pd.concat([df1, df2], axis=1) -- horizontal stack (columns)","pd.concat([df1, df2], keys=['Q1','Q2']) -- MultiIndex with source label","pd.concat(list_of_dfs) -- stack a list of any length"],},
      {title:"ignore_index=True -- When to Use It",content:"Each DataFrame keeps its original row numbers when concatenated. sales_q1 has index 0,1,2 and sales_q2 also has 0,1,2. The combined DataFrame has duplicate indices 0,1,2,0,1,2. Use ignore_index=True to get a clean 0,1,2,3,4,5 sequence.",analogy:"Like restarting page numbering when binding two chapters into one book. Without it, both chapters start at page 1.",},
      {title:"concat vs append (deprecated)",content:"pd.DataFrame.append() was removed in Pandas 2.0. The replacement is pd.concat(). If you see code using .append(), replace it with pd.concat([df, new_row_df], ignore_index=True).",},
      {title:"Use Cases",useCases:[{icon:"ETL",title:"Monthly File Stacking",body:"pd.concat([pd.read_csv(f) for f in glob('*.csv')], ignore_index=True)"},{icon:"API",title:"API Pagination",body:"Collect each page into a list, pd.concat() once at the end"},{icon:"AB",title:"A/B Test Results",body:"pd.concat([control_df, treatment_df], keys=['control','treatment'])"},{icon:"ML",title:"Train/Test Split",body:"pd.concat([X_train, X_test]).reset_index() for combined analysis"}],}],
    code:"import pandas as pd\n\nsales_q1 = pd.DataFrame({\n    'Rep_ID': [101, 102, 103],\n    'Name':   ['Alice', 'Bob', 'Charlie'],\n    'Sales':  [25000, 30000, 15000]\n})\n\nsales_q2 = pd.DataFrame({\n    'Rep_ID': [101, 103, 104],\n    'Name':   ['Alice', 'Charlie', 'David'],\n    'Sales':  [27000, 18000, 22000]\n})\n\n# Basic vertical concat\ncombined = pd.concat([sales_q1, sales_q2])\nprint('Without ignore_index:')\nprint(combined)\nprint('Index:', combined.index.tolist())\n\n# Clean index\ncombined = pd.concat([sales_q1, sales_q2], ignore_index=True)\nprint('\\nWith ignore_index=True:')\nprint(combined)\n\n# Label the source with keys\nlabelled = pd.concat([sales_q1, sales_q2], keys=['Q1', 'Q2'])\nprint('\\nWith keys (MultiIndex):')\nprint(labelled)\n\n# Horizontal concat (side by side)\nextra = pd.DataFrame({'Bonus': [1000, 1500, 500]})\nhoriz = pd.concat([sales_q1, extra], axis=1)\nprint('\\nHorizontal concat:')\nprint(horiz)",
    purePython:{title:"Stacking tables without Pandas",comparisons:[{task:"Combine two lists of dicts into one",pyCode:"all_rows = []\nfor row in q1_data:\n    all_rows.append(row.copy())\nfor row in q2_data:\n    all_rows.append(row.copy())\n\n# Renumber manually\nfor i, row in enumerate(all_rows):\n    row['_idx'] = i\n# Still a list -- no groupby, plot, stats",pdCode:"combined = pd.concat(\n    [sales_q1, sales_q2],\n    ignore_index=True\n)\n# Full DataFrame immediately",verdict:"Pure Python requires explicit loops and manual index management. pd.concat() handles any number of DataFrames, preserves dtypes, and returns a queryable DataFrame in one call.",saved:"~70% fewer lines"},
        {task:"Stack a variable number of monthly CSV files",pyCode:"import csv, glob\nall_rows = []\nfor path in glob.glob('*.csv'):\n    with open(path) as f:\n        reader = csv.DictReader(f)\n        for row in reader:\n            all_rows.append(row)\n# All values are strings -- must cast",pdCode:"import pandas as pd, glob\ndfs = [pd.read_csv(f)\n       for f in glob.glob('*.csv')]\ncombined = pd.concat(dfs,\n    ignore_index=True)\n# dtypes inferred per file",verdict:"For 12 monthly files, pd.concat of a list comprehension is 2 lines. Pure Python: explicit loop, manual casting, no dtypes. The list-comprehension + concat pattern is idiomatic Pandas ETL.",saved:"~80% fewer lines"}]},
    quiz:[{q:"pd.concat([df1, df2]) without ignore_index=True. df1 has index 0-2, df2 has 0-2. The result index is:",opts:["0,1,2,3,4,5","0,1,2,0,1,2","A RangeIndex 0-5","Raises DuplicateIndexError"],correct:1,explain:"concat preserves each DataFrame's original index. If both have 0,1,2 you get 0,1,2,0,1,2. This causes subtle bugs when you try to .loc[] by label. Use ignore_index=True to get a clean sequence."},
      {q:"pd.concat([df1, df2], axis=1) does what?",opts:["Stacks rows (same as axis=0)","Places DataFrames side by side as new columns","Raises ValueError","Merges on shared column names"],correct:1,explain:"axis=1 concatenates COLUMNS -- DataFrames are placed side by side. Rows are aligned by INDEX. Mismatched indices produce NaN. This is like adding new columns from a parallel dataset."},
      {q:"pd.concat([df1, df2], keys=['Q1','Q2']) produces:",opts:["A column named 'keys'","A DataFrame with a MultiIndex where outer level is Q1/Q2","An error if column names differ","A dict with Q1 and Q2 keys"],correct:1,explain:"keys= creates a MultiIndex on the row index where the outer level labels the SOURCE DataFrame. df.loc['Q1'] then retrieves all rows from the first source."},
      {q:"pd.DataFrame.append() in Pandas 2.0:",opts:["Works normally","Is faster than concat","Was removed -- use pd.concat() instead","Only works with Series"],correct:2,explain:".append() was deprecated in Pandas 1.4 and removed in 2.0. Use pd.concat([df, new_df], ignore_index=True). append() called concat internally anyway -- concat is the canonical API."}],
    openChallenges:[{q:"You receive jan.csv, feb.csv, mar.csv in a folder. Write a one-expression pipeline that loads all 3 files, stacks them, resets the index, and adds a 'source' column with the filename.",hint:"Use glob to find files, add filename as a column before concat, then pd.concat(dfs, ignore_index=True).",solution:"import pandas as pd, glob\ndfs = []\nfor path in glob.glob('*.csv'):\n    df = pd.read_csv(path)\n    df['source'] = path\n    dfs.append(df)\ncombined = pd.concat(dfs, ignore_index=True)"},
      {q:"Concatenate sales_q1 and sales_q2 with keys=['Q1','Q2']. Then use .loc['Q1'] to extract only Q1 data. Also try .xs('Q2') and compare.",hint:"pd.concat(..., keys=[...]). The result has a MultiIndex. .loc['Q1'] uses outer level. .xs('Q2', level=0) is equivalent.",solution:"labelled = pd.concat([sales_q1, sales_q2], keys=['Q1','Q2'])\nprint(labelled.loc['Q1'])\nprint(labelled.xs('Q2', level=0))  # same result"}],
    experiments:[{title:"Exp 1: ignore_index explorer",desc:"Toggle ignore_index. See how the combined index changes.",inputs:[{id:"ignore",label:"ignore_index (yes/no)",val:"yes",type:"text",w:"70px"}],runId:"cat_ignore"},
      {title:"Exp 2: axis selector",desc:"axis=0 stacks rows, axis=1 stacks columns.",inputs:[{id:"axis",label:"axis (0 or 1)",val:"0",type:"text",w:"50px"}],runId:"cat_axis"}],
    mistakes:[{title:"Concatenating inside a loop (O(n^2))",wrong:"combined = pd.DataFrame()\nfor f in files:\n    df = pd.read_csv(f)\n    combined = pd.concat([combined, df])  # slow!",fix:"dfs = [pd.read_csv(f) for f in files]\ncombined = pd.concat(dfs, ignore_index=True)  # fast!",why:"Each pd.concat() inside a loop creates a new DataFrame and copies ALL existing data. For 100 files it copies 1+2+3+...+100 = 5050 DataFrame-lengths. Collect into a list, call concat ONCE."},
      {title:"Using append() in Pandas 2.0+",wrong:"df = df.append(new_row)  # AttributeError in Pandas 2.0!",fix:"df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)",why:"DataFrame.append() was removed in Pandas 2.0 after being deprecated in 1.4. The canonical replacement is pd.concat() on a list. Always build a list and call concat once rather than appending row by row."}],
  },
  {
    id:"merge",
    icon:"JOIN",
    title:"Merging & Joining",
    desc:"SQL-style joins -- inner, left, right, outer, cross",
    xpReward:65,
    chapter:5,
    subtopic:"5.2 Merge & Join",
    theory:[{title:"pd.merge() -- The SQL JOIN of Pandas",content:"pd.merge() connects rows in two DataFrames based on matching key values. It is the direct equivalent of SQL JOIN. Master this and database-style data integration becomes effortless.",analogy:"A transaction table has Customer_ID but no name. A customer table has Customer_ID and Name. Merge them on Customer_ID to get transactions with customer names -- exactly like a database foreign key join.",},
      {title:"The Four JOIN Types",points:["how='inner' (default) -- only rows where key exists in BOTH tables","how='left' -- all rows from left + matching from right (NaN if no match)","how='right' -- all rows from right + matching from left (NaN if no match)","how='outer' -- all rows from BOTH tables (NaN where no match on either side)"],},
      {title:"Key Parameters",points:["on='col' -- merge on one shared column","on=['col1','col2'] -- merge on multiple columns (composite key)","left_on='col_A', right_on='col_B' -- different column names in each table","left_index=True, right_index=True -- merge on index","suffixes=('_q1','_q2') -- rename clashing column names","validate='one_to_one' -- safeguard against unexpected duplicates"],},
      {title:"df.join() vs pd.merge()",content:"df.join() merges on INDEX by default. It is a shortcut for pd.merge(left_index=True, right_index=True). Use join() when your key IS the index. Use merge() for column-based joins -- it is more flexible and explicit.",},
      {title:"validate= -- The Safety Net",content:"validate='one_to_one' raises MergeError if either table has duplicate keys. Use 'one_to_many' or 'many_to_one' to document and enforce your join assumption. Catches many-to-many explosions before they corrupt your analysis.",},
      {title:"Use Cases",useCases:[{icon:"CRM",title:"CRM + Transactions",body:"transactions.merge(customers, on='customer_id', how='left') -- enrich every transaction with customer name/segment"},{icon:"INV",title:"Inventory Report",body:"orders.merge(products, on='product_id').merge(suppliers, on='supplier_id') -- chain merges"},{icon:"HR",title:"HR Analytics",body:"employees.merge(salaries, on='emp_id', how='left') -- all employees, NaN if no salary record"},{icon:"GEO",title:"Geodata",body:"cities.merge(population, left_on='city_name', right_on='City') -- different column names"}],}],
    code:"import pandas as pd\nimport numpy as np\n\nsales_q1 = pd.DataFrame({\n    'Rep_ID': [101, 102, 103],\n    'Name':   ['Alice', 'Bob', 'Charlie'],\n    'Sales':  [25000, 30000, 15000]\n})\n\nsales_q2 = pd.DataFrame({\n    'Rep_ID': [101, 103, 104],\n    'Name':   ['Alice', 'Charlie', 'David'],\n    'Sales':  [27000, 18000, 22000]\n})\n\nregions = pd.DataFrame({\n    'Rep_ID': [101, 102, 103, 104],\n    'Region': ['North', 'South', 'East', 'West']\n})\n\n# LEFT join -- all Q1 reps, region where available\nprint('LEFT join:')\nprint(pd.merge(sales_q1, regions, on='Rep_ID', how='left'))\n\n# INNER join -- only matching Rep_IDs\nprint('\\nINNER join:')\nprint(pd.merge(sales_q1, sales_q2, on='Rep_ID', how='inner',\n               suffixes=('_Q1','_Q2')))\n\n# OUTER join -- all reps from both quarters\nprint('\\nOUTER join:')\nprint(pd.merge(sales_q1, sales_q2, on='Rep_ID', how='outer',\n               suffixes=('_Q1','_Q2')))\n\n# Multi-step chain merge\nfull = (sales_q1\n        .merge(regions, on='Rep_ID', how='left')\n        .rename(columns={'Sales':'Q1_Sales'}))\nfull = full.merge(sales_q2[['Rep_ID','Sales']], on='Rep_ID', how='left')\nfull.rename(columns={'Sales':'Q2_Sales'}, inplace=True)\nprint('\\nChained merge:')\nprint(full)\n\n# validate safeguard\ntry:\n    pd.merge(sales_q1, regions, on='Rep_ID',\n             how='left', validate='one_to_one')\n    print('\\nValidation passed')\nexcept Exception as e:\n    print('\\nMergeError:', e)",
    purePython:{title:"Joining tables without Pandas",comparisons:[{task:"Left join: keep all rows from left, add region from right",pyCode:"region_map = {r['Rep_ID']:r['Region']\n              for r in regions}\n\nresult = []\nfor row in sales_q1:\n    merged = dict(row)\n    merged['Region'] = region_map.get(\n        row['Rep_ID'], None  # NaN equivalent\n    )\n    result.append(merged)\n# Still a list of dicts",pdCode:"pd.merge(\n    sales_q1, regions,\n    on='Rep_ID',\n    how='left'\n)",verdict:"Pure Python: build a lookup dict, loop rows, manually handle missing keys. pd.merge() handles all join types, composite keys, suffix disambiguation, and validation in one call.",saved:"~75% fewer lines"},
        {task:"Inner join on multiple keys",pyCode:"# Must build composite key tuples\nleft_idx = {(r['id'],r['date']):r\n            for r in left_data}\nresult = []\nfor row in right_data:\n    key = (row['id'],row['date'])\n    if key in left_idx:\n        merged = {**left_idx[key], **row}\n        result.append(merged)",pdCode:"pd.merge(\n    df_left, df_right,\n    on=['id','date'],\n    how='inner'\n)",verdict:"Composite key joins in Python require tuple-key dicts and careful collision handling. pd.merge with on=['col1','col2'] handles it natively with proper NaN propagation and suffixes.",saved:"~80% fewer lines"}]},
    quiz:[{q:"sales_q1 has Rep_IDs 101,102,103. regions has 101,102,103,104. LEFT join on Rep_ID -- how many rows?",opts:["4 (all regions)","3 (all Q1 reps)","7 (all unique IDs)","Depends on duplicates"],correct:1,explain:"LEFT join keeps ALL rows from the LEFT table (sales_q1 = 3 rows). It brings in matching data from the right. Rep 104 exists only in regions -- it is dropped. Result: 3 rows."},
      {q:"Merging two DataFrames where BOTH have 2 rows with Rep_ID=101 creates:",opts:["2 rows for Rep 101","4 rows for Rep 101 (Cartesian product)","An error","1 row (first match)"],correct:1,explain:"Pandas performs a Cartesian product: 2 from left x 2 from right = 4 rows for that key. This is the many-to-many explosion. Use validate='one_to_one' to catch it early."},
      {q:"left_on='customer_id', right_on='cust_id' is used when:",opts:["You want to merge on index","The key column has different names in each table","You need multiple join keys","You want a right join"],correct:1,explain:"When the join key column has different names (customer_id in left, cust_id in right), use left_on= and right_on= instead of on=. on= requires the same column name in both tables."},
      {q:"validate='one_to_one' in pd.merge() does what if duplicates exist?",opts:["Silently drops duplicates","Takes the first match","Raises MergeError","Performs a cross join"],correct:2,explain:"validate= enforces the cardinality assumption. 'one_to_one' requires the key to be unique in BOTH tables. If duplicates are found it raises MergeError immediately, preventing silent data corruption."}],
    openChallenges:[{q:"Merge sales_q1 and sales_q2 with how='outer' and suffixes=('_Q1','_Q2'). Then create a new column 'Total_Sales' = Q1_Sales + Q2_Sales (use fillna(0) first). Which rep has the highest total?",hint:"outer join keeps David (Q2 only) and Bob (Q1 only) with NaN for missing quarter. fillna(0) before sum.",solution:"merged = pd.merge(sales_q1, sales_q2, on='Rep_ID', how='outer', suffixes=('_Q1','_Q2'))\nmerged['Q1_Sales'] = merged['Sales_Q1'].fillna(0)\nmerged['Q2_Sales'] = merged['Sales_Q2'].fillna(0)\nmerged['Total'] = merged['Q1_Sales'] + merged['Q2_Sales']\nprint(merged[['Rep_ID','Name_Q1','Total']].sort_values('Total', ascending=False))"},
      {q:"Chain three merges: sales_q1 -> regions -> a new 'quotas' DataFrame (Rep_ID, Quota). Show which reps hit their quota in Q1. Use validate='one_to_one' on each merge.",hint:"Build quotas df manually. Chain .merge().merge(). Add a 'hit_quota' boolean column: df['hit_quota'] = df['Sales'] >= df['Quota']",solution:"quotas = pd.DataFrame({'Rep_ID':[101,102,103],'Quota':[24000,28000,16000]})\nresult = (sales_q1\n    .merge(regions, on='Rep_ID', how='left', validate='one_to_one')\n    .merge(quotas, on='Rep_ID', how='left', validate='one_to_one')\n)\nresult['hit_quota'] = result['Sales'] >= result['Quota']\nprint(result[['Name','Region','Sales','Quota','hit_quota']])"}],
    experiments:[{title:"Exp 1: JOIN type explorer",desc:"Choose join type. See which reps appear in the result.",inputs:[{id:"how",label:"how=",val:"left",type:"text",w:"80px"}],runId:"merge_how"},
      {title:"Exp 2: validate= safeguard",desc:"Add a duplicate Rep_ID. See how validate catches it.",inputs:[{id:"validate",label:"validate=",val:"one_to_one",type:"text",w:"130px"}],runId:"merge_validate"}],
    mistakes:[{title:"Many-to-many join explosion",wrong:"# Both tables have duplicate Rep_ID=101\n# Result: 2x3 = 6 rows for Rep 101!\nmerged = pd.merge(df_a, df_b, on='Rep_ID')\nmerged['Sales'].sum()  # inflated by 3x!",fix:"pd.merge(df_a, df_b, on='Rep_ID',\n         validate='one_to_one')  # raises MergeError\n# Deduplicate BEFORE merging if needed",why:"When a key appears N times in the left and M times in the right, the merged result has N*M rows for that key. Aggregates on the merged table are silently wrong. Always validate join cardinality."},
      {title:"Missing suffixes on overlapping column names",wrong:"pd.merge(sales_q1, sales_q2, on='Rep_ID')\n# Error or creates: Sales_x, Sales_y (confusing)",fix:"pd.merge(sales_q1, sales_q2, on='Rep_ID',\n         suffixes=('_Q1','_Q2'))\n# Creates: Sales_Q1, Sales_Q2 (clear)",why:"When both DataFrames have a column with the same name (other than the join key), Pandas auto-adds _x and _y suffixes. Always specify explicit suffixes so column names remain self-documenting."}],
  },
  {
    id:"melt",
    icon:"MLT",
    title:"Melt -- Wide to Long",
    desc:"Transform wide tables into tidy long format for analysis",
    xpReward:55,
    chapter:5,
    subtopic:"5.3 Reshape: Melt",
    theory:[{title:"Wide vs Long Format",content:"Wide format: one row per entity, one column per time period/category (e.g., Q1_Sales, Q2_Sales, Q3_Sales columns). Long (tidy) format: one row per observation -- entity + variable + value. Most analysis tools, visualisation libraries, and ML models require long format.",analogy:"Wide is like a school report card: one row per student, one column per subject. Long is the exam register: each row is one exam attempt (student + subject + score).",},
      {title:"pd.melt() -- Unpivoting",content:"pd.melt() unpivots a DataFrame from wide to long. You specify which columns are ID variables (stay fixed) and the rest get 'melted' into rows.",points:["id_vars=['col'] -- columns that stay as-is (the identifiers)","value_vars=['Q1','Q2'] -- which columns to melt (default: all non-id)","var_name='Quarter' -- name for the new variable column","value_name='Revenue' -- name for the new value column","pd.melt(df, id_vars='A') -- minimal call"],},
      {title:"When to Melt",points:["Seaborn/Plotly: hue= argument requires long format","GroupBy across quarters: long format lets groupby('Quarter').sum()","ML features: each observation must be a separate row","SQL UNION: each row should be one measurement"],},
      {title:"str.replace to Clean var_name Column",content:"After melting, the variable column often contains the original column names (Q1_Sales, Q2_Sales). Use str.replace('_Sales','') to clean them to Q1, Q2 for display.",},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Financial Reporting",body:"Quarterly P&L: wide (Q1,Q2,Q3,Q4 columns) -> melt -> long -> seaborn lineplot"},{icon:"IOT",title:"Sensor Readings",body:"Wide: one column per sensor -> melt -> long -> groupby('sensor').mean()"},{icon:"EDU",title:"Exam Scores",body:"Wide: Math,Science,English columns -> melt -> tidy -> facet plot per subject"},{icon:"ML",title:"Feature Engineering",body:"Wide: day1,day2,...day30 columns -> melt -> LSTM input sequence"}],}],
    code:"import pandas as pd\n\nwide_sales = pd.DataFrame({\n    'Region':   ['North', 'South', 'East'],\n    'Q1_Sales': [25000, 30000, 15000],\n    'Q2_Sales': [27000, 32000, 18000]\n})\n\nprint('Wide format:')\nprint(wide_sales)\n\n# Basic melt\nlong_sales = pd.melt(\n    wide_sales,\n    id_vars='Region',\n    var_name='Quarter',\n    value_name='Revenue'\n)\nprint('\\nLong format (melted):')\nprint(long_sales)\n\n# Clean the Quarter column: 'Q1_Sales' -> 'Q1'\nlong_sales['Quarter'] = long_sales['Quarter'].str.replace('_Sales','', regex=False)\nprint('\\nCleaned Quarter column:')\nprint(long_sales)\n\n# Now: groupby across quarters is natural\nprint('\\nTotal revenue by quarter:')\nprint(long_sales.groupby('Quarter')['Revenue'].sum())\n\n# Melt only specific columns\nlong_q1_only = pd.melt(\n    wide_sales,\n    id_vars='Region',\n    value_vars=['Q1_Sales'],\n    var_name='Quarter',\n    value_name='Revenue'\n)\nprint('\\nMelt Q1 only:')\nprint(long_q1_only)",
    purePython:{title:"Wide-to-long transformation without Pandas",comparisons:[{task:"Unpivot a wide table to long format",pyCode:"result = []\nfor row in wide_data:\n    region = row['Region']\n    for col in ['Q1_Sales','Q2_Sales']:\n        result.append({\n            'Region': region,\n            'Quarter': col,\n            'Revenue': row[col]\n        })\n# Nested loops for N id_vars + M value_vars",pdCode:"pd.melt(\n    wide_sales,\n    id_vars='Region',\n    var_name='Quarter',\n    value_name='Revenue'\n)",verdict:"Pure Python: nested loops, manual key management, must know column names in advance. pd.melt() handles any number of id_vars and value_vars, auto-infers which columns to melt, in one call.",saved:"~80% fewer lines"}]},
    quiz:[{q:"pd.melt(df, id_vars='Region') -- what happens to columns not listed in id_vars?",opts:["They are dropped","They become rows in the var_name column with their values in value_name","They stay as columns","Raises ValueError"],correct:1,explain:"Any column not in id_vars gets melted into rows. Their original column names go into the var_name column, their values go into the value_name column. Use value_vars= to select a subset."},
      {q:"After melting, the 'Quarter' column contains 'Q1_Sales', 'Q2_Sales'. How do you clean to 'Q1', 'Q2'?",opts:["df.rename(columns=...)","df['Quarter'].str.replace('_Sales','',regex=False)","pd.melt(var_name=str.replace(...))","df['Quarter'].map(lambda x: x[:2])"],correct:1,explain:"Use str.replace on the melted column post-melt. Alternatively, rename your columns BEFORE melting: df.rename(columns={'Q1_Sales':'Q1','Q2_Sales':'Q2'}) then melt."},
      {q:"Why do visualisation libraries like Seaborn prefer long format?",opts:["Long format is smaller","Seaborn only reads CSV","hue=, col=, row= parameters map a single column to colour/facets -- only possible if all values are in one column","Wide format causes MemoryError"],correct:2,explain:"Seaborn's hue='Quarter' means 'colour by this column'. That only works if all quarter values (Q1, Q2, Q3) are in one column. Wide format spreads them across columns -- Seaborn cannot colour them without melting first."}],
    openChallenges:[{q:"A DataFrame has columns: Country, 2020_GDP, 2021_GDP, 2022_GDP. Melt it into long format with columns Country, Year, GDP. Then clean the Year column to remove '_GDP'. Finally, groupby('Year')['GDP'].mean() to find average world GDP per year.",hint:"id_vars='Country', value_vars=['2020_GDP','2021_GDP','2022_GDP'], var_name='Year'. Then str.replace('_GDP','').",solution:"long = pd.melt(df, id_vars='Country', var_name='Year', value_name='GDP')\nlong['Year'] = long['Year'].str.replace('_GDP','', regex=False)\nprint(long.groupby('Year')['GDP'].mean())"},
      {q:"Melt wide_sales. Then use seaborn (or just describe the call) to create a grouped bar chart of Revenue by Region, coloured by Quarter. Why is long format necessary for this?",hint:"seaborn.barplot(data=long_sales, x='Region', y='Revenue', hue='Quarter'). hue= requires all quarter values in one column.",solution:"# long format required because hue='Quarter'\n# needs all quarter labels in a single column\nimport seaborn as sns\nlong = pd.melt(wide_sales, id_vars='Region', var_name='Quarter', value_name='Revenue')\nlong['Quarter'] = long['Quarter'].str.replace('_Sales','')\nsns.barplot(data=long, x='Region', y='Revenue', hue='Quarter')"}],
    experiments:[{title:"Exp 1: melt explorer",desc:"Choose which columns to melt. See the long format output.",inputs:[{id:"cols",label:"Melt columns (Q1/Q2/both)",val:"both",type:"text",w:"110px"}],runId:"melt_cols"},
      {title:"Exp 2: var_name and value_name",desc:"Customise the output column names.",inputs:[{id:"varn",label:"var_name",val:"Quarter",type:"text",w:"100px"},{id:"valn",label:"value_name",val:"Revenue",type:"text",w:"100px"}],runId:"melt_names"}],
    mistakes:[{title:"Forgetting id_vars -- melting the identifier",wrong:"pd.melt(df, var_name='Quarter', value_name='Revenue')\n# Region also gets melted! Now you lose track of which region",fix:"pd.melt(df, id_vars='Region', var_name='Quarter',\n        value_name='Revenue')",why:"Without id_vars, ALL columns get melted. Your identifier (Region, Country, Name) becomes a row value -- you lose the ability to tell which observation belongs to which entity."},
      {title:"Melting when you should pivot",wrong:"# You want a SUMMARY TABLE for reporting\n# melt makes it LONGER -- harder to read\nlong = pd.melt(df, id_vars='Rep', var_name='Q', value_name='Sales')\nlong  # too many rows for an executive report",fix:"# Use pivot_table() for summary/presentation\npd.pivot_table(df, index='Rep',\n               columns='Quarter', values='Sales',\n               aggfunc='sum')",why:"melt makes data longer -- great for analysis and plotting. pivot_table makes it wider -- great for reports and presentation. Know which direction you need before transforming."}],
  },
  {
    id:"pivot",
    icon:"PVT",
    title:"Pivot & Pivot Table",
    desc:"Long to wide, aggregated -- the summary table powerhouse",
    xpReward:60,
    chapter:5,
    subtopic:"5.4 Reshape: Pivot",
    theory:[{title:"pivot() vs pivot_table()",content:"pivot() purely reshapes -- no aggregation. Fails if index/column combination is not unique. pivot_table() reshapes AND aggregates (like SQL GROUP BY + reshape). Use pivot_table() for real data which almost always has duplicates.",analogy:"pivot() is like sorting a bookshelf -- it rearranges books but if two books have the same title/author it breaks. pivot_table() is like an index at the back of a book -- it groups and summarises, handling multiple occurrences gracefully.",},
      {title:"pd.pivot_table() parameters",points:["index='col' -- row labels (like GROUP BY)","columns='col' -- creates one column per unique value","values='col' -- which numeric column to aggregate","aggfunc='sum' -- aggregation function: sum/mean/count/min/max/list","fill_value=0 -- replace NaN in result with this value","margins=True -- add row/column totals (Grand Total)","observed=True -- for category dtype columns, show only observed combos"],},
      {title:"pivot() parameters (simpler)",content:"df.pivot(index='row_col', columns='col_col', values='val_col')",points:["No aggfunc -- assumes unique index/column pairs","ValueError if duplicates exist -- use pivot_table instead","Faster than pivot_table when data is already deduplicated"]},
      {title:"Flattening Multi-Level Column Names",content:"When you pass multiple aggfuncs or multiple values to pivot_table(), the result has MultiIndex columns. Flatten with: df.columns = ['_'.join(c) for c in df.columns]. Or use named aggregations with aggfunc={'col': 'sum'}.",},
      {title:"Use Cases",useCases:[{icon:"RPT",title:"Executive Report",body:"pivot_table(index='Region', columns='Quarter', values='Revenue', aggfunc='sum', margins=True) -> one-page summary"},{icon:"ML",title:"Feature Matrix",body:"pivot_table(index='customer_id', columns='product', values='quantity', aggfunc='sum', fill_value=0) -> user-item matrix"},{icon:"FIN",title:"Financial Model",body:"pivot_table(index='month', columns='category', values='amount', aggfunc='sum') -> budget vs actual table"},{icon:"HR",title:"Headcount",body:"pivot_table(index='department', columns='grade', values='emp_id', aggfunc='count') -> org structure grid"}],}],
    code:"import pandas as pd\n\nsales_q1 = pd.DataFrame({'Rep_ID':[101,102,103],'Name':['Alice','Bob','Charlie'],'Sales':[25000,30000,15000]})\nsales_q2 = pd.DataFrame({'Rep_ID':[101,103,104],'Name':['Alice','Charlie','David'],'Sales':[27000,18000,22000]})\nregions  = pd.DataFrame({'Rep_ID':[101,102,103,104],'Region':['North','South','East','West']})\n\ncombined = pd.concat([sales_q1, sales_q2], ignore_index=True)\ncombined['Quarter'] = ['Q1']*3 + ['Q2']*3\nfull = combined.merge(regions, on='Rep_ID', how='left')\nprint('Full dataset:')\nprint(full)\n\n# pivot_table: total sales per rep\npivot1 = pd.pivot_table(full, index='Name', values='Sales', aggfunc='sum')\nprint('\\nTotal sales per rep:')\nprint(pivot1)\n\n# pivot_table: cross-tab Region x Quarter\npivot2 = pd.pivot_table(\n    full, index='Region', columns='Quarter',\n    values='Sales', aggfunc='sum', fill_value=0\n)\nprint('\\nRegion x Quarter sales:')\nprint(pivot2)\n\n# With margins (Grand Total)\npivot3 = pd.pivot_table(\n    full, index='Region', columns='Quarter',\n    values='Sales', aggfunc='sum',\n    fill_value=0, margins=True\n)\nprint('\\nWith totals row/col:')\nprint(pivot3)\n\n# Simple pivot (no duplicates)\nlong = pd.DataFrame({\n    'Region':  ['North','North','South','South'],\n    'Quarter': ['Q1','Q2','Q1','Q2'],\n    'Sales':   [25000,27000,30000,32000]\n})\npiv = long.pivot(index='Region', columns='Quarter', values='Sales')\nprint('\\nSimple pivot():')\nprint(piv)",
    purePython:{title:"Pivot tables without Pandas",comparisons:[{task:"Create a cross-tab: Region x Quarter total sales",pyCode:"from collections import defaultdict\ntotals = defaultdict(lambda:defaultdict(int))\n\nfor row in data:\n    region = row['Region']\n    quarter = row['Quarter']\n    totals[region][quarter] += row['Sales']\n\n# Display -- manually build table\nquarters = ['Q1','Q2']\nfor region, qdata in totals.items():\n    print(region, [qdata.get(q,0) for q in quarters])",pdCode:"pd.pivot_table(\n    full,\n    index='Region',\n    columns='Quarter',\n    values='Sales',\n    aggfunc='sum',\n    fill_value=0\n)",verdict:"Pure Python: nested defaultdict, manual key enumeration, manual display. pivot_table() returns a proper DataFrame with automatic MultiIndex, fill_value, and margins -- ready for further analysis or export.",saved:"~85% fewer lines"}]},
    quiz:[{q:"df.pivot() raises ValueError: 'Index contains duplicate entries'. The fix is:",opts:["df.pivot(keep='first')","df.pivot_table() with aggfunc","df.drop_duplicates() then pivot -- only if data is truly identical","Either b or c depending on whether duplicates should be aggregated or dropped"],correct:3,explain:"If duplicates represent different data that should be summed/averaged: use pivot_table(aggfunc='sum'). If they are true duplicate rows that should not exist: deduplicate first then pivot. The choice depends on your data semantics."},
      {q:"pivot_table(margins=True) adds:",opts:["A 'Total' column only","A 'Total' row only","An 'All' row and 'All' column with totals","A percentage column"],correct:2,explain:"margins=True adds an 'All' row (totals across columns) and an 'All' column (totals across rows) -- a Grand Total row and column. Perfect for executive summary tables."},
      {q:"pivot_table with aggfunc='count' on values='Sales' counts:",opts:["The sum of Sales","How many non-NaN Sales values exist for each group","The number of unique Sales values","Raises TypeError"],correct:1,explain:"aggfunc='count' counts the number of non-NaN values in the values column for each group. This is effectively COUNT(*) in SQL. Use aggfunc='nunique' for distinct count."},
      {q:"After pivot_table with multiple aggfuncs, df.columns is a MultiIndex. To flatten to 'Sales_sum', 'Sales_mean', use:",opts:["df.columns.flatten()","df.columns = ['_'.join(c) for c in df.columns]","df.reset_index()","df.stack()"],correct:1,explain:"MultiIndex column tuples like ('Sales','sum') can be joined with '_'.join(c) to produce flat string names like 'Sales_sum'. This is the standard pattern for flattening multi-level pivot output."}],
    openChallenges:[{q:"Using the full dataset (Name, Region, Quarter, Sales), create a pivot_table with: rows=Region, columns=Quarter, values=Sales, aggfunc='sum', fill_value=0, margins=True. Then find which region has the highest total sales.",hint:"After pivot, the 'All' column contains row totals. pivot3['All'].idxmax() gives the region.",solution:"pivot3 = pd.pivot_table(full, index='Region', columns='Quarter', values='Sales', aggfunc='sum', fill_value=0, margins=True)\nprint(pivot3)\nprint('\\nTop region:', pivot3['All'].drop('All').idxmax())"},
      {q:"Build a user-item matrix from a transactions DataFrame: rows=customer_id, columns=product_name, values=quantity, aggfunc='sum', fill_value=0. This is the standard collaborative filtering input. What does each cell mean?",hint:"pivot_table(index='customer_id', columns='product_name', values='quantity', aggfunc='sum', fill_value=0). Each cell: how many units customer X bought of product Y.",solution:"transactions = pd.DataFrame({'customer_id':[1,1,2,2,3],'product':['A','B','A','C','B'],'quantity':[2,1,3,1,2]})\nuser_item = pd.pivot_table(transactions, index='customer_id', columns='product', values='quantity', aggfunc='sum', fill_value=0)\nprint(user_item)\n# Each cell = units customer bought of that product"}],
    experiments:[{title:"Exp 1: aggfunc switcher",desc:"Change the aggregation function. See how the pivot changes.",inputs:[{id:"agg",label:"aggfunc (sum/mean/count/max)",val:"sum",type:"text",w:"110px"}],runId:"pvt_agg"},
      {title:"Exp 2: margins toggle",desc:"Toggle Grand Total row and column.",inputs:[{id:"margins",label:"margins (yes/no)",val:"yes",type:"text",w:"70px"}],runId:"pvt_margins"}],
    mistakes:[{title:"Using pivot() on data with duplicates",wrong:"df.pivot(index='Name', columns='Quarter', values='Sales')\n# ValueError: Index contains duplicate entries!",fix:"pd.pivot_table(df, index='Name', columns='Quarter',\n               values='Sales', aggfunc='sum')",why:"pivot() is a pure reshape -- it cannot handle duplicate (index, columns) combinations and throws ValueError. pivot_table() aggregates duplicates with aggfunc before reshaping. Use pivot_table() by default."},
      {title:"NaN in pivot from missing combinations",wrong:"pivot = pd.pivot_table(...)\n# Bob has no Q2 data -> Bob row has NaN in Q2 column\npivot['Q2'].sum()  # skips Bob silently",fix:"pd.pivot_table(..., fill_value=0)\n# NaN -> 0 for missing combinations",why:"pivot_table fills cells with no data with NaN by default. For sales/count data this is usually wrong -- use fill_value=0 to make missing combinations explicit zeros."}],
  },
  {
    id:"explode_stack",
    icon:"EXP",
    title:"Explode, Stack & Transpose",
    desc:"Unpack lists, stack/unstack MultiIndex, flip axes",
    xpReward:55,
    chapter:5,
    subtopic:"5.5 Advanced Reshape",
    theory:[{title:".explode() -- Unpacking List Cells",content:"When a cell contains a Python list (common in JSON API data), .explode() creates one row per list item, duplicating all other column values. The index is preserved (duplicated).",analogy:"A movie has genres=['Action','Sci-Fi']. explode() creates two rows: one for Action, one for Sci-Fi -- both with the same movie title and rating.",},
      {title:"explode() details",points:["df.explode('col') -- explode list column into rows","df.explode(['col1','col2']) -- explode multiple list columns simultaneously (Pandas 1.3+)","After explode, call .reset_index(drop=True) for a clean index","Values that are not lists (scalars, NaN) are preserved as-is"],},
      {title:".stack() and .unstack() -- MultiIndex Navigation",content:"stack() pivots the COLUMNS into an additional index level (wider -> longer). unstack() does the reverse -- pivots an index level into columns (longer -> wider). These are the precise inverse of each other.",points:["df.stack() -- column level becomes innermost index level","df.unstack() -- innermost index level becomes columns","df.unstack(level=0) -- specify which level to unstack","Equivalent to melt/pivot but for MultiIndex DataFrames"],},
      {title:".T -- Transpose",content:"df.T flips rows and columns instantly. Equivalent to df.transpose(). Useful for: displaying wide DataFrames vertically, before applying row-wise operations (axis=1 is expensive -- transpose first), or viewing a single row as a readable column.",},
      {title:"Use Cases",useCases:[{icon:"API",title:"JSON API Lists",body:"genres=['Action','Sci-Fi'] -> explode -> one row per genre -> groupby('genre').mean('rating')"},{icon:"NLP",title:"Text Processing",body:"df['tokens'] = df['text'].str.split() -> explode -> word frequency count"},{icon:"ML",title:"Multi-label",body:"labels=['cat','dog','bird'] per image -> explode -> one-hot encoding"},{icon:"RPT",title:"Transposing for Display",body:"df.head(1).T -- view a single row as a vertical list of field:value pairs"}],}],
    code:"import pandas as pd\n\nteam_data = pd.DataFrame({\n    'Manager':        ['Alice', 'Charlie'],\n    'Direct_Reports': [['Bob', 'Eve'], ['David']]\n})\n\n# Explode list column\nexploded = team_data.explode('Direct_Reports')\nprint('Exploded:')\nprint(exploded)\nprint('Index:', exploded.index.tolist())\n\n# Clean index after explode\nexploded = exploded.reset_index(drop=True)\nprint('\\nAfter reset_index:')\nprint(exploded)\n\n# Transpose\nprint('\\nTransposed (.T):')\nprint(exploded.T)\n\n# Stack / Unstack\nsales_by_region_quarter = pd.DataFrame({\n    'Q1': {'North': 25000, 'South': 30000},\n    'Q2': {'North': 27000, 'South': 32000}\n})\nprint('\\nWide DataFrame:')\nprint(sales_by_region_quarter)\n\nstacked = sales_by_region_quarter.stack()\nprint('\\nAfter .stack() (long):')\nprint(stacked)\n\nunstacked = stacked.unstack()\nprint('\\nAfter .unstack() (wide again):')\nprint(unstacked)\n\n# JSON-like data use case\nmovies = pd.DataFrame({\n    'title':  ['Inception', 'Interstellar'],\n    'rating': [8.8, 8.6],\n    'genres': [['Sci-Fi','Thriller'], ['Sci-Fi','Adventure']]\n})\nlong_movies = movies.explode('genres').reset_index(drop=True)\nprint('\\nMovies exploded by genre:')\nprint(long_movies)\nprint('Avg rating by genre:')\nprint(long_movies.groupby('genres')['rating'].mean().round(2))",
    purePython:{title:"Exploding lists without Pandas",comparisons:[{task:"Expand list cells into separate rows",pyCode:"result = []\nfor row in team_data:\n    for report in row['Direct_Reports']:\n        result.append({\n            'Manager': row['Manager'],\n            'Direct_Reports': report\n        })\n# Must handle scalar vs list check\n# Must handle NaN check\n# Index duplication logic manual",pdCode:"team_data.explode('Direct_Reports')\n# Handles lists, scalars, NaN\n# Index preserved (duplicated)\n# reset_index(drop=True) to clean",verdict:"Pure Python: nested loop with manual type checking. explode() handles lists, scalars (left as-is), and NaN, with index duplication, in one call. For multi-column explode, pure Python becomes a complex nested loop.",saved:"~75% fewer lines"}]},
    quiz:[{q:"team_data has 2 rows. After explode('Direct_Reports') where row 0 has ['Bob','Eve'] and row 1 has ['David'], the result has:",opts:["2 rows","3 rows","4 rows","Raises ValueError"],correct:1,explain:"Row 0 expands to 2 rows (Bob and Eve). Row 1 expands to 1 row (David). Total = 3 rows. Both expanded rows from row 0 keep index label 0 -- that is why reset_index() is usually called after."},
      {q:"df.stack() on a DataFrame with columns Q1, Q2 produces:",opts:["A wider DataFrame with more columns","A Series/DataFrame with Q1 and Q2 pushed into the index","A pivot table","An error if values are numeric"],correct:1,explain:"stack() moves the column level INTO the row index, creating a MultiIndex. The result is longer (more rows, fewer columns). unstack() reverses this -- moves an index level back into columns."},
      {q:"df.T.T equals:",opts:["An error","The original df (transpose is its own inverse)","A copy of df","df with columns reversed"],correct:1,explain:"Transpose is an involution -- applying it twice returns the original. df.T.T == df (same data, same shape, same dtypes)."},
      {q:"After explode(), the index contains [0,0,1]. This means:",opts:["Error -- duplicate indices","Both rows at index 0 came from the same original row","The first row was duplicated intentionally","Index is arbitrary"],correct:1,explain:"explode() preserves the original row's index for ALL expanded rows. Index 0,0 means both 'Bob' and 'Eve' came from original row 0 (Alice's team). Call reset_index(drop=True) to get 0,1,2."}],
    openChallenges:[{q:"Load a DataFrame where each movie has a 'genres' list column. explode() into long format. Then: (a) count movies per genre, (b) find average rating per genre, (c) find genres that appear in more than 2 movies.",hint:"After explode: groupby('genres').size() for count. groupby('genres')['rating'].mean() for avg. Filter: counts[counts > 2]",solution:"movies_long = movies.explode('genres').reset_index(drop=True)\nprint(movies_long.groupby('genres').size())  # count per genre\nprint(movies_long.groupby('genres')['rating'].mean())  # avg rating\ncounts = movies_long.groupby('genres').size()\nprint(counts[counts > 2])  # genres with 3+ movies"},
      {q:"Take the Region x Quarter wide_sales DataFrame. Apply .stack() to get long format. Compare the result to pd.melt(). Are they equivalent? What are the differences?",hint:"stack() produces a Series with MultiIndex. melt() produces a DataFrame with explicit column names. Both go wide->long but stack() is more concise for MultiIndex DataFrames.",solution:"# stack() approach\nstacked = wide_sales.set_index('Region').stack()\nprint(stacked)\n# Index: (Region, Quarter), values are sales\n\n# melt() approach\nlong = pd.melt(wide_sales, id_vars='Region', var_name='Quarter', value_name='Sales')\nprint(long)\n# Difference: stack returns MultiIndex Series; melt returns named-column DataFrame"}],
    experiments:[{title:"Exp 1: explode visualiser",desc:"See how a list cell expands into multiple rows.",inputs:[{id:"lists",label:"List (comma-sep)",val:"Bob,Eve,Frank",type:"text",w:"160px"}],runId:"exp_explode"},
      {title:"Exp 2: stack vs unstack",desc:"Apply stack or unstack and see the shape change.",inputs:[{id:"op",label:"Operation (stack/unstack)",val:"stack",type:"text",w:"90px"}],runId:"exp_stack"}],
    mistakes:[{title:"Forgetting reset_index after explode",wrong:"df = df.explode('genres')\ndf.loc[0]  # returns MULTIPLE rows! (ambiguous label)",fix:"df = df.explode('genres').reset_index(drop=True)\ndf.loc[0]  # now returns exactly one row",why:"explode() duplicates the original row's index for all expanded rows. If original row 0 had a 3-item list, .loc[0] returns 3 rows. Call reset_index(drop=True) immediately after explode for predictable behaviour."},
      {title:"explode() on non-list values",wrong:"# Column has mixed: some lists, some strings\ndf.explode('col')\n# String 'hello' gets treated as a scalar, not chars",fix:"# Ensure column contains lists\ndf['col'] = df['col'].apply(\n    lambda x: x if isinstance(x, list) else [x]\n)",why:"explode() leaves scalar values (strings, ints, NaN) as single rows -- it does NOT split strings into characters. If you have mixed list/scalar cells, wrap scalars in a list first."}],
  },
  {
    id:"groupby_basics",
    icon:"GRP",
    title:"GroupBy Basics",
    desc:"Split-Apply-Combine -- the core data analysis pattern",
    xpReward:50,
    chapter:6,
    subtopic:"6.1 GroupBy Basics",
    theory:[{title:"The Dataset: Restaurant Orders",content:"Throughout Chapter 6 we use a restaurant tips dataset with 7 rows: Waiter (Alice/Bob/Charlie), Day (Fri/Sat/Sun), Meal_Time (Dinner/Lunch), Total_Bill, and Tip. This mirrors real business data -- transactions that need to be summarised by category.",},
      {title:"Split-Apply-Combine",content:"GroupBy implements the 'Split-Apply-Combine' paradigm in three steps: (1) SPLIT the DataFrame into groups by one or more columns, (2) APPLY a function to each group independently, (3) COMBINE the results back into a new DataFrame.",analogy:"Imagine sorting restaurant receipts into piles by waiter, calculating each waiter's total, then writing those totals on a summary sheet. That is split (sort into piles) -> apply (sum each pile) -> combine (write the summary).",},
      {title:"The GroupBy Object",content:"df.groupby('col') does NOT calculate anything immediately. It returns a DataFrameGroupBy object -- a lightweight map of which rows belong to which group. Computation only happens when you call an aggregation method on it.",points:["grouped = df.groupby('Day') -- lazy, no computation yet","grouped.groups -- dict of {group_key: [row_indices]}","grouped.get_group('Fri') -- extract one group as DataFrame","grouped.ngroups -- number of unique groups","for name, group_df in grouped: -- iterate over groups"],},
      {title:"Selecting Columns Before Aggregating",content:"Chain column selection immediately after groupby to avoid TypeError on non-numeric columns.",points:["df.groupby('Day')[['Total_Bill','Tip']].mean() -- select two columns","df.groupby('Day')['Tip'].sum() -- select one column (returns Series)","df.groupby('Day').mean(numeric_only=True) -- safer alternative"],},
      {title:"Use Cases",useCases:[{icon:"EC",title:"E-Commerce",body:"groupby('customer_id')['amount'].sum() -- lifetime value per customer"},{icon:"HR",title:"HR Analytics",body:"groupby('department')['salary'].mean() -- avg salary per dept"},{icon:"LOG",title:"Server Logs",body:"groupby('ip_address')['event'].count() -- requests per IP"},{icon:"SCH",title:"School Grades",body:"groupby('subject')['score'].mean() -- class average per subject"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'Waiter':     ['Alice','Bob','Alice','Charlie','Bob','Alice','Charlie'],\n    'Day':        ['Fri','Fri','Sat','Sat','Sun','Sun','Sun'],\n    'Meal_Time':  ['Dinner','Lunch','Dinner','Dinner','Dinner','Lunch','Dinner'],\n    'Total_Bill': [25.50,15.00,45.20,30.10,18.50,12.00,40.00],\n    'Tip':        [5.00,2.00,9.00,6.00,3.50,2.00,8.00]\n}\ndf = pd.DataFrame(data)\n\n# The GroupBy object -- lazy\ngrouped = df.groupby('Day')\nprint('GroupBy object:', grouped)\nprint('Groups:', grouped.groups)\n\n# Extract one group\nprint('\\nFriday group:')\nprint(grouped.get_group('Fri'))\n\n# Basic aggregation\nprint('\\nMean bill and tip per day:')\nprint(df.groupby('Day')[['Total_Bill','Tip']].mean().round(2))\n\n# Common single-column aggregations\nprint('\\nTotal tips per waiter:')\nprint(df.groupby('Waiter')['Tip'].sum())\n\nprint('\\nOrders per waiter:')\nprint(df.groupby('Waiter')['Tip'].count())\n\nprint('\\nMax bill per day:')\nprint(df.groupby('Day')['Total_Bill'].max())\n\n# Multi-column groupby\nprint('\\nGroup by Waiter AND Day:')\nprint(df.groupby(['Waiter','Day'])[['Total_Bill','Tip']].sum())",
    purePython:{title:"GroupBy without Pandas",comparisons:[{task:"Calculate mean Total_Bill per Day",pyCode:"from collections import defaultdict\n\nbills_by_day = defaultdict(list)\nfor row in data:\n    bills_by_day[row['Day']].append(\n        row['Total_Bill']\n    )\n\navgs = {day: sum(v)/len(v)\n        for day, v in bills_by_day.items()}\n\nfor day, avg in sorted(avgs.items()):\n    print(f'{day}: {avg:.2f}')",pdCode:"df.groupby('Day')['Total_Bill'].mean()",verdict:"Pure Python: defaultdict, list accumulation, manual mean, manual sort. Pandas groupby + mean: one expression. For multiple aggregations (mean, sum, std simultaneously) the gap grows further.",saved:"~80% fewer lines"},
        {task:"Group by two columns simultaneously",pyCode:"groups = defaultdict(list)\nfor row in data:\n    key = (row['Waiter'], row['Day'])\n    groups[key].append(row['Total_Bill'])\n\nfor (waiter, day), vals in sorted(groups.items()):\n    print(waiter, day, sum(vals))",pdCode:"df.groupby(['Waiter','Day'])['Total_Bill'].sum()",verdict:"Pure Python: composite tuple keys, manual accumulation. Pandas: pass a list to groupby. For 3+ grouping columns, pure Python becomes a nested dict mess.",saved:"~75% fewer lines"}]},
    quiz:[{q:"df.groupby('Day') returns:",opts:["A DataFrame with daily averages","A dict of DataFrames","A DataFrameGroupBy object -- no computation yet","A Series indexed by Day"],correct:2,explain:"groupby() is lazy -- it returns a GroupBy object containing only the metadata (which rows belong to which group). No aggregation is performed until you call .mean(), .sum(), .agg() etc."},
      {q:"df.groupby('Day').mean() on a DataFrame with string columns raises:",opts:["Returns NaN for string columns","TypeError on string columns","Silently drops string columns in all Pandas versions","Works perfectly"],correct:1,explain:"In newer Pandas, applying .mean() directly on a mixed DataFrame raises TypeError on string columns. Fix: df.groupby('Day')[['Total_Bill','Tip']].mean() or pass numeric_only=True."},
      {q:"grouped.get_group('Fri') returns:",opts:["The mean of the Fri group","A Series of Friday values","A DataFrame containing only the rows where Day == 'Fri'","The index positions of Friday rows"],correct:2,explain:"get_group(key) extracts the full DataFrame slice for that group key -- exactly like df[df['Day']=='Fri'] but using the precomputed GroupBy map."},
      {q:"df.groupby('Waiter')['Tip'].count() counts:",opts:["Number of unique Tip values","Number of non-NaN Tip values per waiter","Sum of tips","Number of rows regardless of NaN"],correct:1,explain:"count() counts NON-NaN values per group. If a waiter has 3 rows but 1 has NaN tip, count returns 2. Use size() to count ALL rows including NaN."}],
    openChallenges:[{q:"Using the restaurant dataset, find: (a) the waiter with the highest average tip, (b) the day with the most orders, (c) the total revenue (Total_Bill) per Meal_Time.",hint:"(a) groupby('Waiter')['Tip'].mean().idxmax(). (b) groupby('Day').size().idxmax(). (c) groupby('Meal_Time')['Total_Bill'].sum()",solution:"# (a) Highest avg tip waiter\nprint(df.groupby('Waiter')['Tip'].mean().idxmax())\n# (b) Busiest day\nprint(df.groupby('Day').size().idxmax())\n# (c) Revenue by meal time\nprint(df.groupby('Meal_Time')['Total_Bill'].sum())"},
      {q:"Iterate over the GroupBy object with a for loop. Print each group name and the number of rows in that group.",hint:"for name, group_df in df.groupby('Waiter'): print(name, len(group_df))",solution:"for name, group_df in df.groupby('Waiter'):\n    print(f'{name}: {len(group_df)} orders, total bill: ${group_df[\"Total_Bill\"].sum():.2f}')"}],
    experiments:[{title:"Exp 1: GroupBy inspector",desc:"Choose a column to group by. See groups, sizes, and means.",inputs:[{id:"col",label:"Group by",val:"Day",type:"text",w:"110px"}],runId:"grp_inspect"},
      {title:"Exp 2: Aggregation function",desc:"Apply different agg functions to Total_Bill by Waiter.",inputs:[{id:"agg",label:"aggfunc (sum/mean/max/min/count)",val:"sum",type:"text",w:"120px"}],runId:"grp_agg"}],
    mistakes:[{title:"Mean on mixed DataFrame (TypeError)",wrong:"df.groupby('Day').mean()\n# TypeError: could not convert string to float",fix:"df.groupby('Day')[['Total_Bill','Tip']].mean()\n# OR:\ndf.groupby('Day').mean(numeric_only=True)",why:"Pandas cannot average string columns (Waiter, Day, Meal_Time). Always select only numeric columns AFTER groupby, or pass numeric_only=True. The former is more explicit."},
      {title:"Slicing a GroupBy object directly",wrong:"grouped = df.groupby('Day')\ngrouped['Fri']   # KeyError or TypeError",fix:"grouped.get_group('Fri')   # correct\n# OR: df[df['Day']=='Fri']  # regular filter",why:"A GroupBy object is not a dict or DataFrame -- you cannot index it with []. Use .get_group(key) to extract a specific group, or iterate with for name, group in grouped:."}],
  },
  {
    id:"agg",
    icon:"AGG",
    title:"Custom Aggregation with .agg()",
    desc:"Multiple functions per column, named aggregations, custom lambdas",
    xpReward:60,
    chapter:6,
    subtopic:"6.2 .agg()",
    theory:[{title:"Why .agg()?",content:"Basic methods like .mean() and .sum() apply ONE function to ALL columns. .agg() lets you: apply different functions to different columns, apply multiple functions to one column simultaneously, and use custom Python functions.",analogy:"Basic groupby.mean() is like asking everyone in a group 'what is your average?'. .agg() is like asking each person a different question: Alice gets mean, Bob gets sum, Charlie gets a custom score.",},
      {title:".agg() with a dict",content:"Pass a dict mapping column names to aggregation functions. One function per column, or a list for multiple.",points:["df.groupby('Waiter').agg({'Tip':'sum','Total_Bill':'mean'}) -- different fn per col","df.groupby('Waiter').agg({'Total_Bill':['sum','count','mean']}) -- multiple fns per col","Creates MultiIndex columns when multiple fns per col","Flatten: df.columns = ['_'.join(c) for c in df.columns]"],},
      {title:"Named Aggregation (Pandas 0.25+)",content:"Use keyword arguments in .agg() to control output column names directly. Cleaner than flattening MultiIndex.",points:["df.groupby('Waiter')['Total_Bill'].agg(total='sum', avg='mean', orders='count')","df.groupby('Waiter').agg(total_bill=('Total_Bill','sum'), max_tip=('Tip','max'))","Result has exactly the column names you specify -- no MultiIndex to flatten"],},
      {title:"Custom Functions in .agg()",content:"Pass any Python function that takes a Series and returns a scalar.",points:["df.groupby('Day')['Tip'].agg(lambda x: x.max() - x.min())  -- tip range","df.groupby('Day')['Tip'].agg(lambda x: (x > x.mean()).sum())  -- tips above avg","def cv(x): return x.std()/x.mean()  -- coefficient of variation","df.groupby('Day')['Total_Bill'].agg(cv)"],},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Financial Summary",body:"agg({'revenue':['sum','mean'],'transactions':'count','returns':'sum'}) per customer"},{icon:"EC",title:"Product Analytics",body:"agg(avg_rating=('rating','mean'), review_count=('review_id','count'), last_review=('date','max'))"},{icon:"OPS",title:"Operations",body:"agg({'response_time':['mean','std','max'],'errors':'sum'}) per service per hour"},{icon:"HR",title:"Payroll",body:"agg(total_salary=('salary','sum'), headcount=('emp_id','count'), avg_tenure=('years','mean'))"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'Waiter':     ['Alice','Bob','Alice','Charlie','Bob','Alice','Charlie'],\n    'Day':        ['Fri','Fri','Sat','Sat','Sun','Sun','Sun'],\n    'Meal_Time':  ['Dinner','Lunch','Dinner','Dinner','Dinner','Lunch','Dinner'],\n    'Total_Bill': [25.50,15.00,45.20,30.10,18.50,12.00,40.00],\n    'Tip':        [5.00,2.00,9.00,6.00,3.50,2.00,8.00]\n}\ndf = pd.DataFrame(data)\n\n# Dict agg: different functions per column\nresult1 = df.groupby('Waiter').agg({\n    'Total_Bill': ['sum', 'count'],\n    'Tip': 'max'\n})\nprint('Dict agg (MultiIndex columns):')\nprint(result1)\n\n# Flatten the MultiIndex columns\nresult1.columns = ['_'.join(c) for c in result1.columns]\nprint('\\nFlattened columns:')\nprint(result1)\n\n# Named aggregation -- cleaner output\nresult2 = df.groupby('Waiter').agg(\n    total_sales = ('Total_Bill', 'sum'),\n    orders      = ('Total_Bill', 'count'),\n    best_tip    = ('Tip', 'max'),\n    avg_tip     = ('Tip', 'mean')\n)\nprint('\\nNamed aggregation:')\nprint(result2.round(2))\n\n# Multi-column groupby + agg\nresult3 = df.groupby(['Waiter','Day']).agg(\n    total_bill = ('Total_Bill', 'sum'),\n    tip_max    = ('Tip', 'max')\n)\nprint('\\nMulti-key named agg:')\nprint(result3)\n\n# Custom function: tip range\ntip_range = df.groupby('Day')['Tip'].agg(\n    lambda x: x.max() - x.min()\n)\nprint('\\nTip range per day:')\nprint(tip_range.round(2))",
    purePython:{title:"Multiple aggregations without Pandas",comparisons:[{task:"Compute sum, count, and max tip per waiter simultaneously",pyCode:"from collections import defaultdict\n\nsales = defaultdict(float)\norders = defaultdict(int)\nbest_tip = defaultdict(float)\n\nfor row in data:\n    w = row['Waiter']\n    sales[w] += row['Total_Bill']\n    orders[w] += 1\n    best_tip[w] = max(best_tip[w], row['Tip'])\n\nfor w in sorted(sales):\n    print(w, sales[w], orders[w], best_tip[w])",pdCode:"df.groupby('Waiter').agg(\n    total_sales=('Total_Bill','sum'),\n    orders=('Total_Bill','count'),\n    best_tip=('Tip','max')\n)",verdict:"Pure Python: three separate defaultdicts, manual accumulation loop, manual max tracking. Named agg: one expression, self-documenting column names, returns a proper DataFrame ready for export or further analysis.",saved:"~85% fewer lines"}]},
    quiz:[{q:"df.groupby('Waiter').agg({'Total_Bill':['sum','count']}) -- what type are the result's columns?",opts:["Regular string columns: 'sum','count'","MultiIndex columns: ('Total_Bill','sum'),('Total_Bill','count')","An error -- list not allowed","A Series, not DataFrame"],correct:1,explain:"Passing a list of functions for one column creates MultiIndex columns: outer level = column name, inner level = function name. Flatten with ['_'.join(c) for c in df.columns]."},
      {q:"Named aggregation syntax: df.groupby('W').agg(total=('Bill','sum')). The result column is named:",opts:["Bill","sum","total","Bill_sum"],correct:2,explain:"In named aggregation, the KEYWORD argument name becomes the column name. agg(total=('Bill','sum')) creates a column called 'total'. This is the cleanest way to control output column names."},
      {q:"A custom lambda in .agg() must:",opts:["Return a DataFrame","Return a scalar (single value) per group","Accept a DataFrame argument","Be written as a def, not lambda"],correct:1,explain:".agg() expects functions that reduce a Series to a SCALAR. lambda x: x.max() - x.min() returns one number per group. If your function returns a Series, use .transform() or .apply() instead."},
      {q:"After MultiIndex column flatten: [('Total_Bill','sum'),('Tip','max')] -> df.columns = ['_'.join(c) for c in df.columns] gives:",opts:["['Total_Bill','Tip']","['sum','max']","['Total_Bill_sum','Tip_max']","Error: cannot join tuples"],correct:2,explain:"'_'.join(('Total_Bill','sum')) = 'Total_Bill_sum'. The list comprehension applies this to each column tuple, giving ['Total_Bill_sum','Tip_max']."}],
    openChallenges:[{q:"Using named aggregation, create a 'waiter performance' table with: total_revenue, num_tables, avg_tip, tip_pct (avg tip as % of avg bill), best_day (day with highest single bill -- use idxmax inside lambda).",hint:"tip_pct = avg_tip / avg_bill * 100. For best_day, you need groupby(['Waiter','Day']) then another aggregation -- or use apply.",solution:"perf = df.groupby('Waiter').agg(\n    total_revenue = ('Total_Bill','sum'),\n    num_tables    = ('Total_Bill','count'),\n    avg_tip       = ('Tip','mean'),\n    max_tip       = ('Tip','max')\n)\nperf['tip_pct'] = perf['avg_tip'] / (df.groupby('Waiter')['Total_Bill'].mean()) * 100\nprint(perf.round(2))"},
      {q:"Write a custom coefficient of variation function (std/mean) and apply it via .agg() to Total_Bill per Day. Which day has the most variable bills?",hint:"def cv(x): return x.std()/x.mean(). df.groupby('Day')['Total_Bill'].agg(cv). Highest cv = most variable.",solution:"def cv(x):\n    return x.std() / x.mean()\n\nresult = df.groupby('Day')['Total_Bill'].agg(cv)\nprint(result.round(3))\nprint('Most variable day:', result.idxmax())"}],
    experiments:[{title:"Exp 1: Multi-function agg builder",desc:"Choose two aggregation functions. See the multi-function result.",inputs:[{id:"fn1",label:"Function 1",val:"sum",type:"text",w:"80px"},{id:"fn2",label:"Function 2",val:"count",type:"text",w:"80px"}],runId:"agg_multi"},
      {title:"Exp 2: Named agg column namer",desc:"Choose output column names for total and average.",inputs:[{id:"name1",label:"Total col name",val:"revenue",type:"text",w:"110px"},{id:"name2",label:"Avg col name",val:"avg_bill",type:"text",w:"110px"}],runId:"agg_named"}],
    mistakes:[{title:"Assigning .mean() result back to DataFrame (length mismatch)",wrong:"df['Day_Avg'] = df.groupby('Day')['Total_Bill'].mean()\n# ValueError: Length of values (3) != length of index (7)",fix:"df['Day_Avg'] = df.groupby('Day')['Total_Bill'].transform('mean')\n# transform() broadcasts back to original 7 rows",why:".mean() reduces 7 rows to 3 (one per day). You cannot assign 3 values into a 7-row column. Use .transform() which returns a same-length result by broadcasting the group value to every row in that group."},
      {title:"Forgetting to flatten MultiIndex columns",wrong:"result = df.groupby('W').agg({'Bill':['sum','count']})\nresult['Bill_sum']  # KeyError -- column is ('Bill','sum')",fix:"result.columns = ['_'.join(c) for c in result.columns]\nresult['Bill_sum']  # works now",why:"Passing a list of functions creates MultiIndex (tuple) column labels. You cannot access them with simple string names. Always flatten immediately after the .agg() call."}],
  },
  {
    id:"transform_filter",
    icon:"TRF",
    title:"Transform & Filter",
    desc:"Broadcast group values back, keep/drop entire groups",
    xpReward:60,
    chapter:6,
    subtopic:"6.3 Transform & Filter",
    theory:[{title:".transform() -- Group Stats on Every Row",content:".transform() applies a function to each group and BROADCASTS the result back to the original DataFrame's shape. Every row gets the group-level statistic, not just one row per group.",analogy:"agg() is like a class exam returning one average score per class. transform() writes that class average next to EVERY student's individual score -- so you can compare each student to their class average in the same row.",},
      {title:"What transform() enables",points:["Normalisation: (df['val'] - df.groupby('grp')['val'].transform('mean')) / df.groupby('grp')['val'].transform('std')","Percentage of total: df['val'] / df.groupby('grp')['val'].transform('sum')","Filling NaN with group mean: df['col'].fillna(df.groupby('grp')['col'].transform('mean'))","Boolean mask: df[df['sales'] > df.groupby('region')['sales'].transform('mean')]"],},
      {title:".filter() -- Keep or Drop Entire Groups",content:"groupby().filter(lambda x: condition) evaluates the condition over each group. Returns ONLY rows from groups where the condition is True. Drops all rows from groups where it is False.",points:["df.groupby('Waiter').filter(lambda x: x['Tip'].count() > 2) -- keep busy waiters","df.groupby('Day').filter(lambda x: x['Total_Bill'].sum() > 50) -- keep high-revenue days","lambda x: len(x) >= 3 -- minimum group size","lambda x: x['Tip'].mean() >= 5 -- minimum average tip"],},
      {title:"transform() vs agg() vs filter()",content:"agg() reduces N rows to 1 per group. transform() keeps N rows, adds group stat to each. filter() keeps or drops entire groups based on a group-level condition. These are the three fundamental GroupBy operations.",},
      {title:"Use Cases",useCases:[{icon:"ML",title:"Feature Normalisation",body:"(x - group_mean) / group_std -- Z-score within each category"},{icon:"FRD",title:"Fraud Detection",body:"filter(lambda x: x.count() > 50) -- flag IPs with too many attempts"},{icon:"FIN",title:"Portfolio Analytics",body:"transform('sum') to get portfolio total, then divide each position -- % allocation"},{icon:"NaN",title:"Group Imputation",body:"fillna(groupby('category')['price'].transform('median')) -- fill by category"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'Waiter':     ['Alice','Bob','Alice','Charlie','Bob','Alice','Charlie'],\n    'Day':        ['Fri','Fri','Sat','Sat','Sun','Sun','Sun'],\n    'Meal_Time':  ['Dinner','Lunch','Dinner','Dinner','Dinner','Lunch','Dinner'],\n    'Total_Bill': [25.50,15.00,45.20,30.10,18.50,12.00,40.00],\n    'Tip':        [5.00,2.00,9.00,6.00,3.50,2.00,8.00]\n}\ndf = pd.DataFrame(data)\n\n# transform() -- broadcast group sum back to each row\ndf['Waiter_Total'] = df.groupby('Waiter')['Total_Bill'].transform('sum')\ndf['Pct_of_Waiter'] = (df['Total_Bill'] / df['Waiter_Total'] * 100).round(1)\nprint('Percentage of waiter total:')\nprint(df[['Waiter','Total_Bill','Waiter_Total','Pct_of_Waiter']])\n\n# Z-score normalisation within each Day group\nday_mean = df.groupby('Day')['Total_Bill'].transform('mean')\nday_std  = df.groupby('Day')['Total_Bill'].transform('std').fillna(1)\ndf['Bill_Zscore'] = ((df['Total_Bill'] - day_mean) / day_std).round(2)\nprint('\\nZ-score per day:')\nprint(df[['Waiter','Day','Total_Bill','Bill_Zscore']])\n\n# Filling NaN with group mean using transform\ndf_missing = df.copy()\ndf_missing.loc[1,'Tip'] = np.nan\ndf_missing['Tip'] = df_missing['Tip'].fillna(\n    df_missing.groupby('Day')['Tip'].transform('mean')\n)\nprint('\\nAfter NaN imputation by day mean:')\nprint(df_missing[['Waiter','Day','Tip']])\n\n# filter() -- keep only busy waiters (>2 orders)\nprint('\\nOnly waiters with >2 orders:')\nbusy = df.groupby('Waiter').filter(lambda x: len(x) > 2)\nprint(busy[['Waiter','Day','Total_Bill']])\n\n# filter() -- keep high-revenue days (>40 total)\nprint('\\nHigh-revenue days (>40 total):')\nhigh_days = df.groupby('Day').filter(lambda x: x['Total_Bill'].sum() > 40)\nprint(high_days[['Waiter','Day','Total_Bill']])",
    purePython:{title:"Transform/filter patterns without Pandas",comparisons:[{task:"Add waiter's total sales as a new column on each row",pyCode:"# Step 1: compute group totals\nwaiter_totals = {}\nfor row in data:\n    w = row['Waiter']\n    waiter_totals[w] = waiter_totals.get(w,0) + row['Total_Bill']\n\n# Step 2: broadcast back\nfor row in data:\n    row['Waiter_Total'] = waiter_totals[row['Waiter']]",pdCode:"df['Waiter_Total'] = df.groupby('Waiter')['Total_Bill'].transform('sum')",verdict:"Pure Python: two-pass manual process. transform() does the two passes internally in one expression. For multiple transform columns, Pandas is 5-10x less code.",saved:"~80% fewer lines"},
        {task:"Keep only rows from groups with 3+ members",pyCode:"# Count group sizes\ngroup_sizes = {}\nfor row in data:\n    k = row['Waiter']\n    group_sizes[k] = group_sizes.get(k,0) + 1\n\n# Filter rows\nresult = [row for row in data\n          if group_sizes[row['Waiter']] > 2]",pdCode:"df.groupby('Waiter').filter(\n    lambda x: len(x) > 2\n)",verdict:"Pure Python: count pass, then filter pass. filter() does both in one expression with the full group DataFrame available inside the lambda for any group-level condition.",saved:"~75% fewer lines"}]},
    quiz:[{q:"df['Day_Avg'] = df.groupby('Day')['Bill'].transform('mean') -- why does this work but .mean() assignment doesn't?",opts:["transform is faster","transform returns a Series with the SAME index as df -- one value per row","transform only works with mean","mean() requires numeric_only=True"],correct:1,explain:"transform() returns a Series ALIGNED with the original DataFrame's index -- every row gets its group's mean. mean() returns one row per group (3 rows for 3 days) -- cannot be assigned to a 7-row column."},
      {q:"df.groupby('Waiter').filter(lambda x: x['Tip'].mean() >= 5) where Alice avg tip = 5.33, Bob = 2.75, Charlie = 7.0 returns:",opts:["Alice and Charlie rows only","Bob rows only","All rows","An error"],correct:0,explain:"filter keeps groups where the condition is True. Alice (5.33 >= 5) = True, Bob (2.75 >= 5) = False, Charlie (7.0 >= 5) = True. All Alice and Charlie rows are kept, all Bob rows are dropped."},
      {q:"transform('std') on a group with only 1 row returns:",opts:["0","1","NaN (std of 1 element is undefined)","Raises ValueError"],correct:2,explain:"Standard deviation of a single element is mathematically undefined (division by zero in the (n-1) denominator). Pandas returns NaN. Handle with .fillna(1) before using in Z-score normalisation."},
      {q:"The key difference between filter() and boolean masking:",opts:["They are identical","filter() keeps/drops ENTIRE GROUPS based on a group-level condition; boolean masking keeps/drops individual ROWS","filter() is faster","Boolean masking uses groupby internally"],correct:1,explain:"df[df['Tip']>5] drops individual rows below 5. filter(lambda x: x['Tip'].mean()>5) evaluates the WHOLE GROUP and keeps or drops ALL its rows. These are fundamentally different operations."}],
    openChallenges:[{q:"Use transform() to add a 'Bill_vs_Day_Avg' column: the difference between each bill and that day's average. Then filter to show only bills MORE THAN $5 above their day's average.",hint:"transform('mean') gives the day average per row. Subtract to get the difference. Then boolean filter df[df['Bill_vs_Day_Avg'] > 5].",solution:"df['Day_Avg'] = df.groupby('Day')['Total_Bill'].transform('mean')\ndf['Bill_vs_Day_Avg'] = df['Total_Bill'] - df['Day_Avg']\nprint(df[df['Bill_vs_Day_Avg'] > 5][['Waiter','Day','Total_Bill','Bill_vs_Day_Avg']])"},
      {q:"Simulate group-based NaN imputation: set Bob's Sunday tip to NaN. Fill it using the mean tip for that day (Sunday) via transform. Verify the filled value is correct.",hint:"df.loc[4,'Tip'] = np.nan. Then df['Tip'].fillna(df.groupby('Day')['Tip'].transform('mean')).",solution:"df.loc[4,'Tip'] = np.nan  # Bob's Sunday tip\nprint('Sunday mean tip (excl NaN):', df[df['Day']=='Sun']['Tip'].mean())\ndf['Tip'] = df['Tip'].fillna(\n    df.groupby('Day')['Tip'].transform('mean')\n)\nprint(df[df['Day']=='Sun'][['Waiter','Day','Tip']])"}],
    experiments:[{title:"Exp 1: transform % of total",desc:"See each bill as % of that waiter's total.",inputs:[{id:"grp",label:"Group by",val:"Waiter",type:"text",w:"100px"}],runId:"trf_pct"},
      {title:"Exp 2: filter by group size",desc:"Only keep waiters with more than N orders.",inputs:[{id:"min_orders",label:"Min orders",val:"2",type:"number",w:"60px"}],runId:"trf_filter"}],
    mistakes:[{title:"Using agg() instead of transform() for new columns",wrong:"df['Day_Avg'] = df.groupby('Day')['Total_Bill'].mean()\n# ValueError: Length of values (3) != length of index (7)",fix:"df['Day_Avg'] = df.groupby('Day')['Total_Bill'].transform('mean')\n# Returns 7-row Series -- correct!",why:".mean() after groupby reduces 7 rows to 3 (one per group). Assigning 3 values to a 7-row column raises ValueError. .transform('mean') broadcasts each group mean back to all rows in that group."},
      {title:"filter() with a row-level (not group-level) condition",wrong:"df.groupby('Waiter').filter(lambda x: x['Tip'] > 5)\n# Returns: Series, not scalar -- ValueError!",fix:"df.groupby('Waiter').filter(lambda x: x['Tip'].mean() > 5)\n# OR for row-level: df[df['Tip'] > 5]",why:"filter() lambda must return a SCALAR boolean for the whole group. x['Tip'] > 5 returns a boolean Series, not a scalar -- causing ValueError. For row-level filtering, use regular boolean indexing."}],
  },
  {
    id:"binning_crosstab",
    icon:"BIN",
    title:"Binning & Cross-Tabulation",
    desc:"pd.cut, pd.qcut, pd.crosstab -- discretise and frequency-count",
    xpReward:55,
    chapter:6,
    subtopic:"6.4 Binning & Crosstab",
    theory:[{title:"Why Bin Continuous Data?",content:"Machine learning algorithms often need categorical inputs. Exploratory analysis reveals patterns better in buckets. pd.cut() and pd.qcut() convert continuous numeric columns into discrete categorical bins.",analogy:"A doctor does not say 'blood pressure = 128'. They say 'Stage 1 Hypertension'. Binning converts a precise number into a meaningful, interpretable category.",},
      {title:"pd.cut() -- Equal-Width Bins",content:"Divides a range into equal-width intervals. You specify the bin boundaries explicitly OR the number of bins.",points:["pd.cut(df['Bill'], bins=3) -- auto 3 equal-width bins","pd.cut(df['Bill'], bins=[0,20,40,100]) -- explicit boundaries","pd.cut(df['Bill'], bins=3, labels=['Low','Med','High']) -- custom labels","right=False -- make intervals left-inclusive [) instead of default (]","include_lowest=True -- include the minimum value in the first bin"],},
      {title:"pd.qcut() -- Equal-Frequency Bins (Quantile-Based)",content:"Divides data so each bin has the SAME NUMBER of observations. Useful when data is skewed -- pd.cut() would create empty bins, pd.qcut() won't.",points:["pd.qcut(df['Bill'], q=4) -- quartiles (Q1/Q2/Q3/Q4)","pd.qcut(df['Bill'], q=4, labels=['Q1','Q2','Q3','Q4'])","pd.qcut(df['Bill'], q=[0,.33,.67,1.0]) -- custom quantiles","qcut vs cut: cut = equal width, qcut = equal count"],},
      {title:"pd.crosstab() -- Frequency Tables",content:"A specialised pivot table that counts observations in each (row, column) combination. Faster and more readable than pivot_table for frequency analysis.",points:["pd.crosstab(df['Meal_Time'], df['Day']) -- row x col frequency","pd.crosstab(df['A'], df['B'], margins=True) -- add row/col totals","pd.crosstab(df['A'], df['B'], normalize='index') -- row percentages","pd.crosstab(df['A'], df['B'], values=df['Tip'], aggfunc='mean') -- mean tip per cell","pd.crosstab(df['A'], [df['B'],df['C']]) -- multi-level columns"],},
      {title:"Use Cases",useCases:[{icon:"ML",title:"Feature Engineering",body:"pd.cut(age, bins=[0,18,35,60,100], labels=['Teen','Young','Mid','Senior']) -> categorical feature"},{icon:"MKT",title:"Customer Segmentation",body:"pd.qcut(lifetime_value, q=5, labels=['Bronze','Silver','Gold','Plat','Diamond'])"},{icon:"MED",title:"Clinical Trials",body:"pd.crosstab(df['treatment'], df['outcome'], normalize='index') -> treatment success rates"},{icon:"FRD",title:"Risk Analysis",body:"pd.crosstab(df['region'], df['risk_level'], margins=True) -> fraud heatmap"}],}],
    code:"import pandas as pd\nimport numpy as np\n\ndata = {\n    'Waiter':     ['Alice','Bob','Alice','Charlie','Bob','Alice','Charlie'],\n    'Day':        ['Fri','Fri','Sat','Sat','Sun','Sun','Sun'],\n    'Meal_Time':  ['Dinner','Lunch','Dinner','Dinner','Dinner','Lunch','Dinner'],\n    'Total_Bill': [25.50,15.00,45.20,30.10,18.50,12.00,40.00],\n    'Tip':        [5.00,2.00,9.00,6.00,3.50,2.00,8.00]\n}\ndf = pd.DataFrame(data)\n\n# pd.cut -- equal-width bins\nbill_bins = pd.cut(df['Total_Bill'],\n                   bins=[0, 20, 35, 50],\n                   labels=['Low','Medium','High'])\nprint('pd.cut (equal-width):')\nprint(bill_bins)\nprint(bill_bins.value_counts())\n\n# pd.qcut -- equal-frequency bins\nbill_q = pd.qcut(df['Total_Bill'], q=3,\n                  labels=['Bottom','Middle','Top'])\nprint('\\npd.qcut (equal-frequency):')\nprint(bill_q.value_counts())\n\n# Add bin column to DataFrame\ndf['Bill_Tier'] = bill_bins\nprint('\\nDataFrame with tier:')\nprint(df[['Waiter','Total_Bill','Bill_Tier']])\n\n# pd.crosstab -- Meal_Time vs Bill_Tier\nprint('\\nCrosstab Meal_Time x Bill_Tier:')\nprint(pd.crosstab(df['Meal_Time'], df['Bill_Tier'],\n                  margins=True))\n\n# Normalised crosstab (row percentages)\nprint('\\nRow percentages:')\nprint(pd.crosstab(df['Meal_Time'], df['Day'],\n                  normalize='index').round(2))\n\n# Crosstab with values\nprint('\\nMean tip per Meal_Time x Day:')\nprint(pd.crosstab(df['Meal_Time'], df['Day'],\n                  values=df['Tip'],\n                  aggfunc='mean').round(2))",
    purePython:{title:"Binning and frequency tables without Pandas",comparisons:[{task:"Bin continuous values into Low/Medium/High categories",pyCode:"def bin_bill(val):\n    if val <= 20:\n        return 'Low'\n    elif val <= 35:\n        return 'Medium'\n    else:\n        return 'High'\n\nbins = [bin_bill(v) for v in bills]\n# Manual -- breaks if boundaries change\n# No NaN handling, no statistics",pdCode:"pd.cut(df['Total_Bill'],\n       bins=[0,20,35,50],\n       labels=['Low','Med','High'])",verdict:"Pure Python: manual if/elif chain that must be updated when bin boundaries change. pd.cut() with bins= is data-driven -- change the bin edges and all categorisations update automatically.",saved:"~70% fewer lines"},
        {task:"Build a frequency table of two categorical columns",pyCode:"from collections import Counter\n\ncounts = Counter(\n    (r['Meal_Time'], r['Day'])\n    for r in data\n)\nfor (meal, day), cnt in sorted(counts.items()):\n    print(meal, day, cnt)",pdCode:"pd.crosstab(df['Meal_Time'],\n            df['Day'],\n            margins=True)",verdict:"Pure Python: Counter of tuple keys, manual sorting, no totals row. crosstab gives a full formatted table with margins, normalization options, and custom aggregation in one call.",saved:"~80% fewer lines"}]},
    quiz:[{q:"pd.cut(values, bins=3) vs pd.qcut(values, q=3) -- key difference?",opts:["cut is faster","cut creates equal-WIDTH intervals; qcut creates equal-COUNT intervals","qcut requires sorted data; cut does not","They are identical"],correct:1,explain:"cut divides the VALUE RANGE into equal-width buckets. qcut divides the DATA into equal-sized groups (same number of observations per bin). For skewed data, cut creates empty bins; qcut always fills each bin equally."},
      {q:"pd.crosstab(df['A'], df['B'], normalize='index') -- what does each cell show?",opts:["Raw count","Row percentage: what fraction of that row's total the cell represents","Column percentage","Grand total percentage"],correct:1,explain:"normalize='index' divides each cell by its ROW total, giving row percentages that sum to 1.0 across each row. normalize='columns' gives column percentages, normalize='all' gives grand total percentages."},
      {q:"pd.cut([10,15,25,50], bins=[0,20,50], labels=['Low','High']) -- value 20 goes into:",opts:["Low","High","NaN -- boundary falls on an edge","Either, randomly"],correct:1,explain:"pd.cut uses half-open intervals (left-exclusive, right-inclusive) by default: (0,20] and (20,50]. Value 20 is in (0,20] so it is in the 'Low' bin. Use right=False to make intervals left-inclusive."},
      {q:"After pd.cut(), bill_bins.value_counts() counts:",opts:["How many times each bin appears in the original data","The sum of values in each bin","The bin boundaries","Number of unique values per bin"],correct:0,explain:"value_counts() on a Categorical Series (result of pd.cut) counts the frequency of each category label -- how many original observations fell into each bin."}],
    openChallenges:[{q:"Bin Total_Bill into quartiles with pd.qcut(q=4, labels=['Q1','Q2','Q3','Q4']). Add as 'Bill_Q' column. Then use pd.crosstab(df['Bill_Q'], df['Waiter'], margins=True) to see which waiter handles which bill sizes most.",hint:"pd.qcut(df['Total_Bill'], q=4, labels=[...]). Assign to df['Bill_Q']. Then crosstab.",solution:"df['Bill_Q'] = pd.qcut(df['Total_Bill'], q=4,\n                       labels=['Q1','Q2','Q3','Q4'],\n                       duplicates='drop')\nprint(pd.crosstab(df['Bill_Q'], df['Waiter'], margins=True))"},
      {q:"Create a normalised crosstab showing what PERCENTAGE of each waiter's orders fall on each day. Which waiter is most concentrated on one day?",hint:"pd.crosstab(df['Waiter'], df['Day'], normalize='index').round(2). Row percentages -- each waiter's day breakdown.",solution:"ct = pd.crosstab(df['Waiter'], df['Day'],\n                 normalize='index').round(2)\nprint(ct)\n# Most concentrated: check which row has highest single value\nprint('\\nMost concentrated waiter:', ct.max(axis=1).idxmax())"}],
    experiments:[{title:"Exp 1: pd.cut bin explorer",desc:"Set number of bins. See how Total_Bill gets categorised.",inputs:[{id:"nbins",label:"Number of bins",val:"3",type:"number",w:"60px"}],runId:"bin_cut"},
      {title:"Exp 2: crosstab normalise",desc:"Change normalize= to see raw counts, row%, or col%.",inputs:[{id:"norm",label:"normalize (no/index/columns/all)",val:"no",type:"text",w:"110px"}],runId:"bin_crosstab"}],
    mistakes:[{title:"pd.cut() with bin boundaries that miss some values",wrong:"pd.cut(df['Bill'], bins=[10,25,40])\n# Bills < 10 or >= 40 become NaN!",fix:"pd.cut(df['Bill'], bins=[0,25,40,100])\n# Cover the full range\n# Use include_lowest=True for the minimum value",why:"pd.cut with explicit bins=[] uses half-open intervals (lo, hi]. Any value outside the range becomes NaN. Always set the leftmost bin to 0 (or lower than your minimum) and rightmost above your maximum."},
      {title:"Using pd.cut when pd.qcut is needed for skewed data",wrong:"# Salary: mostly 30k-50k, one outlier at 2M\npd.cut(salary, bins=5)\n# Creates 4 empty bins + 1 with all the data!",fix:"pd.qcut(salary, q=5)  # equal count per bin\n# OR manually set bins based on domain knowledge",why:"pd.cut splits the VALUE RANGE equally. Outliers stretch the range, creating bins with 0 observations and one bin with 99% of the data. pd.qcut guarantees each bin gets ~N/q observations."}],
  },
  // CHAPTER 7 - Time Series & DateTime
  {
    id:"datetime_basics",
    icon:"DT",
    title:"DateTime Parsing & Index",
    desc:"pd.to_datetime, DatetimeIndex, and the .dt accessor",
    xpReward:50,
    chapter:7,
    subtopic:"7.1 DateTime Basics",
    theory:[{title:"The Dataset: Hourly Stock Trades",content:"Throughout Chapter 7 we use 5 hourly stock trade records spanning 2023-10-25 to 2023-10-27: Date (datetime strings), Price (150-155), and Volume (1000-2000). This mirrors real-world financial, sensor, and log data where timestamps are the primary key.",},
      {title:"Why DateTime as Index?",content:"Setting a datetime column as the DataFrame index unlocks: temporal slicing (df['2023-10-26']), resampling (groupby time frequency), rolling windows, and label-based time range queries. Without a DatetimeIndex, these are unavailable.",analogy:"A DatetimeIndex is like a timeline on a wall chart. With it, you can point to any moment and read across. Without it, you have a pile of unsorted notes.",},
      {title:"pd.to_datetime() -- String to Datetime",content:"Converts string columns (object dtype) to datetime64[ns]. Pandas auto-detects most common date formats. Specify format= for speed and certainty with non-standard strings.",points:["pd.to_datetime(df['Date']) -- auto-detect format","pd.to_datetime(df['Date'], format='%Y-%m-%d %H:%M:%S') -- explicit","pd.to_datetime(df['Date'], errors='coerce') -- bad dates -> NaT","pd.to_datetime('2023-10-25') -- convert a single string","pd.to_datetime(df['Date'], utc=True) -- parse with UTC timezone"],},
      {title:"The .dt Accessor vs DatetimeIndex",content:"When dates are in a COLUMN (Series), use .dt to access components. When dates are the INDEX, call components directly on df.index.",points:["Column: df['Date'].dt.year, df['Date'].dt.month, df['Date'].dt.day_name()","Index: df.index.year, df.index.month, df.index.day_name()","DO NOT: df.index.dt.year -- AttributeError! .dt is for Series only","Component list: year, month, day, hour, minute, dayofweek, weekofyear, quarter"],},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Stock Data",body:"pd.to_datetime(df['Date']) -> set_index -> resample('D').ohlc()"},{icon:"IOT",title:"Sensor Logs",body:"Parse ISO 8601 timestamps -> DatetimeIndex -> 1-hour rolling stats"},{icon:"ECO",title:"Order Timestamps",body:"to_datetime(['ordered','shipped']) -> Timedelta -> SLA compliance"},{icon:"WX",title:"Weather Station",body:"Hourly readings -> DatetimeIndex -> resample('M').mean() monthly avg"}],}],
    code:"import pandas as pd\n\ndata = {\n    'Date':   ['2023-10-25 09:30:00','2023-10-25 10:30:00',\n               '2023-10-26 09:30:00','2023-10-26 10:30:00',\n               '2023-10-27 16:00:00'],\n    'Price':  [150.50, 151.25, 149.80, 152.00, 155.10],\n    'Volume': [1000, 1200, 900, 1500, 2000]\n}\ndf = pd.DataFrame(data)\n\nprint('Before conversion:')\nprint(df.dtypes)\n\n# Convert string -> datetime\ndf['Date'] = pd.to_datetime(df['Date'])\nprint('\\nAfter to_datetime:')\nprint(df.dtypes)\n\n# Set as index\ndf.set_index('Date', inplace=True)\nprint('\\nDataFrame with DatetimeIndex:')\nprint(df)\nprint('\\nIndex type:', type(df.index))\n\n# Extract components from index\ndf['Year']     = df.index.year\ndf['Month']    = df.index.month\ndf['Day']      = df.index.day\ndf['Hour']     = df.index.hour\ndf['DayName']  = df.index.day_name()\ndf['Quarter']  = df.index.quarter\ndf['Weekday']  = df.index.dayofweek  # 0=Mon, 6=Sun\n\nprint('\\nDateTime components:')\nprint(df[['Price','Year','Month','Day','Hour','DayName']])",
    purePython:{title:"DateTime parsing without Pandas",comparisons:[{task:"Parse date strings and extract year/month/day",pyCode:"from datetime import datetime\n\ndates = ['2023-10-25 09:30:00',\n         '2023-10-25 10:30:00',\n         '2023-10-26 09:30:00']\n\nparsed = [\n    datetime.strptime(d,'%Y-%m-%d %H:%M:%S')\n    for d in dates\n]\n\n# No vectorised accessor -- loop\nyears  = [d.year for d in parsed]\nmonths = [d.month for d in parsed]\nhours  = [d.hour for d in parsed]",pdCode:"df['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\n\n# Vectorised -- no loop\ndf.index.year\ndf.index.month\ndf.index.hour\ndf.index.day_name()",verdict:"Pure Python: strptime per row in a list comprehension, then separate list comprehension per component. Pandas: one to_datetime call, then vectorised index attributes. For 10M rows, Pandas is 100x faster via NumPy's datetime64 internally.",saved:"~80% fewer lines + 100x faster"},
        {task:"Filter records to a specific date",pyCode:"target = datetime(2023,10,26)\nfiltered = [\n    row for row in data\n    if datetime.strptime(\n        row['Date'],'%Y-%m-%d %H:%M:%S'\n    ).date() == target.date()\n]",pdCode:"df['2023-10-26']\n# DatetimeIndex slice:\n# all rows on that calendar day",verdict:"Pure Python: parse + compare per row. DatetimeIndex: string label slice returns all rows in that period automatically -- works for '2023-10', '2023', or 'Oct 2023'.",saved:"~85% fewer lines"}]},
    quiz:[{q:"df['Date'].dt.year after df.set_index('Date') raises:",opts:["Returns year column","AttributeError -- .dt is for Series only; use df.index.year","Returns NaN","Works only for integer indices"],correct:1,explain:".dt is a Series accessor for datetime columns. Once a column becomes the INDEX, it is a DatetimeIndex object -- not a Series. Access components directly: df.index.year, df.index.month, df.index.day_name()."},
      {q:"pd.to_datetime('25/10/2023') with day-first format needs:",opts:["format='%d/%m/%Y'","dayfirst=True","errors='coerce'","Both a and b work"],correct:3,explain:"Both work: pd.to_datetime('25/10/2023', format='%d/%m/%Y') is explicit and fastest. pd.to_datetime('25/10/2023', dayfirst=True) tells Pandas to try day-first parsing. For production, use format= for speed and certainty."},
      {q:"After pd.to_datetime(), what is the column dtype?",opts:["object","datetime","datetime64[ns]","timestamp"],correct:2,explain:"Pandas stores datetimes as datetime64[ns] -- NumPy's 64-bit nanosecond precision datetime. This enables vectorised arithmetic, comparison, and resampling operations."},
      {q:"df.index.dayofweek returns 0 for:",opts:["Sunday","Saturday","Monday","Friday"],correct:2,explain:"Pandas follows ISO convention: Monday=0, Tuesday=1, ..., Sunday=6. NOT Excel/JavaScript convention where Sunday=0. Always verify with a known date when building day-of-week filters."}],
    openChallenges:[{q:"Given a DataFrame with a 'timestamp' string column in format 'DD/MM/YYYY HH:MM', convert it to datetime with an explicit format string. Set as index. Add 'is_weekend' boolean column (dayofweek >= 5). Filter to show only weekend rows.",hint:"format='%d/%m/%Y %H:%M'. is_weekend = df.index.dayofweek >= 5. df[df['is_weekend']].",solution:"df['timestamp'] = pd.to_datetime(df['timestamp'], format='%d/%m/%Y %H:%M')\ndf.set_index('timestamp', inplace=True)\ndf['is_weekend'] = df.index.dayofweek >= 5\nprint(df[df['is_weekend']])"},
      {q:"Extract the hour from the index. Create a 'session' column: 'pre-market' (hour < 9), 'market' (9 <= hour <= 16), 'after-hours' (hour > 16). Use pd.cut() with bins.",hint:"hours = df.index.hour. pd.cut(hours, bins=[-1,8,16,24], labels=['pre-market','market','after-hours']).",solution:"hours = df.index.hour\ndf['session'] = pd.cut(hours,\n    bins=[-1, 8, 16, 24],\n    labels=['pre-market','market','after-hours'])\nprint(df[['Price','session']])"}],
    experiments:[{title:"Exp 1: Date component extractor",desc:"Enter a datetime string. See all extracted components.",inputs:[{id:"dt",label:"DateTime string",val:"2023-10-25 09:30:00",type:"text",w:"200px"}],runId:"dt_parse"},
      {title:"Exp 2: dt accessor method",desc:"Choose a component to extract from the stock dataset index.",inputs:[{id:"comp",label:"Component (year/month/day/hour/dayofweek/quarter)",val:"hour",type:"text",w:"200px"}],runId:"dt_component"}],
    mistakes:[{title:"Using .dt on a DatetimeIndex",wrong:"df.set_index('Date', inplace=True)\ndf.index.dt.year  # AttributeError!",fix:"df.index.year       # direct -- no .dt needed\ndf.index.day_name()\ndf.index.hour",why:"The .dt accessor is only for a datetime SERIES (column). When dates become the INDEX, the index already IS a DatetimeIndex object with all components built in. df.index.year works, df.index.dt.year does not."},
      {title:"Operating on string dates before to_datetime",wrong:"df['Date'].dt.month  # AttributeError: object has no .dt\n# 'Date' column is still dtype object (string)",fix:"df['Date'] = pd.to_datetime(df['Date'])  # first!\ndf['Date'].dt.month  # now works",why:"Strings have no .dt accessor -- Pandas does not know they represent dates. pd.to_datetime() converts the column to datetime64[ns] dtype, after which .dt and all datetime operations become available."}],
  },
  {
    id:"temporal_slicing",
    icon:"TSL",
    title:"Temporal Slicing & Components",
    desc:"Date-string indexing, .dt accessors, and time-based filtering",
    xpReward:50,
    chapter:7,
    subtopic:"7.2 Slicing & Components",
    theory:[{title:"String-Based DatetimeIndex Slicing",content:"When the index is a DatetimeIndex, you can slice with partial date strings. Pandas expands the string to cover the full implied period automatically.",points:["df['2023-10-26'] -- all rows on Oct 26","df['2023-10'] -- all rows in October 2023","df['2023'] -- all rows in 2023","df['2023-10-25':'2023-10-26'] -- date range (INCLUSIVE both ends)","df['2023-10-25 09:30':'2023-10-25 10:30'] -- hour range"],},
      {title:"Index vs Column .dt access",content:"Component extraction differs depending on whether datetime is the index or a column.",points:["Column: df['ts'].dt.year, df['ts'].dt.month, df['ts'].dt.hour","Index: df.index.year, df.index.month, df.index.hour","Both: .day_name(), .quarter, .dayofweek, .is_month_end","index-only: df.index.normalize() -- floor to midnight"],},
      {title:"Time-of-Day Filtering",content:"For a DatetimeIndex, between_time() and at_time() filter by time-of-day across any date.",points:["df.at_time('09:30') -- rows exactly at 09:30 each day","df.between_time('09:00','10:00') -- rows in 9-10am window","Useful for: market hours filter, business hours filter, shift analysis"],},
      {title:"Boolean Masks on DateTime Components",content:"Extract a component from the index, then use it as a boolean mask. More flexible than between_time() for complex conditions.",points:["df[df.index.hour == 9] -- only 9am trades","df[df.index.dayofweek < 5] -- weekdays only","df[df.index.month.isin([1,4,7,10])] -- quarter-start months","df[df.index.year == 2023] -- single year"],},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Market Hours",body:"df.between_time('09:30','16:00') -- US market session only"},{icon:"OPS",title:"Shift Analysis",body:"df.between_time('06:00','14:00') -- morning shift logs"},{icon:"WX",title:"Seasonal",body:"df[df.index.month.isin([12,1,2])] -- winter months"},{icon:"EC",title:"Peak Hours",body:"df[df.index.hour.isin([11,12,13,17,18])] -- lunch + dinner rush"}],}],
    code:"import pandas as pd\n\ndata = {\n    'Date':   ['2023-10-25 09:30:00','2023-10-25 10:30:00',\n               '2023-10-26 09:30:00','2023-10-26 10:30:00',\n               '2023-10-27 16:00:00'],\n    'Price':  [150.50, 151.25, 149.80, 152.00, 155.10],\n    'Volume': [1000, 1200, 900, 1500, 2000]\n}\ndf = pd.DataFrame(data)\ndf['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\n\n# Slice by date string -- all rows on Oct 26\nprint('All Oct 26 trades:')\nprint(df['2023-10-26'])\n\n# Date range slice (inclusive on both ends)\nprint('\\nOct 25 to Oct 26:')\nprint(df['2023-10-25':'2023-10-26'])\n\n# Extract components from index\ndf['Day_Name'] = df.index.day_name()\ndf['Hour']     = df.index.hour\ndf['Quarter']  = df.index.quarter\nprint('\\nWith components:')\nprint(df[['Price','Day_Name','Hour','Quarter']])\n\n# Time-of-day filter\nprint('\\nTrades at 09:30 (all days):')\nprint(df.at_time('09:30')[['Price','Volume']])\n\nprint('\\nTrades 09:00-10:00 window:')\nprint(df.between_time('09:00','10:00')[['Price','Volume']])\n\n# Boolean mask on components\nprint('\\nThursday trades (dayofweek==3):')\nprint(df[df.index.dayofweek == 3][['Price','Volume']])",
    purePython:{title:"Time-based filtering without Pandas",comparisons:[{task:"Filter all rows for a specific calendar date",pyCode:"from datetime import datetime, date\n\ntarget = date(2023, 10, 26)\nfiltered = [\n    row for row in data\n    if datetime.fromisoformat(\n        row['Date']\n    ).date() == target\n]",pdCode:"df['2023-10-26']\n# DatetimeIndex string label:\n# returns all rows on that date",verdict:"Pure Python: parse each timestamp, compare .date() objects. DatetimeIndex: a string label on [] slice returns all rows in the implied period. '2023-10' would return a full month, '2023' a full year.",saved:"~85% fewer lines"},
        {task:"Filter rows between two times of day (across all dates)",pyCode:"from datetime import time\nstart, end = time(9,0), time(10,0)\nfiltered = [\n    row for row in data\n    if start <= datetime.fromisoformat(\n        row['Date']\n    ).time() <= end\n]",pdCode:"df.between_time('09:00','10:00')",verdict:"Pure Python: parse, extract .time(), compare bounds. between_time() does this in one call, applied across all dates, without parsing overhead.",saved:"~80% fewer lines"}]},
    quiz:[{q:"df['2023-10'] on a DatetimeIndex returns:",opts:["Row with index label '2023-10'","All rows where the date falls within October 2023","Only rows on Oct 1 2023","An error -- need full date string"],correct:1,explain:"DatetimeIndex string slicing expands partial strings to the full implied period. '2023-10' covers 2023-10-01 00:00:00 through 2023-10-31 23:59:59. This is called partial string indexing and works for year, year-month, and year-month-day."},
      {q:"df['2023-10-25':'2023-10-26'] -- is the right endpoint included?",opts:["No -- Python-style exclusive stop","Yes -- DatetimeIndex loc-style inclusive stop","Depends on the data","Only if both dates exist in the index"],correct:1,explain:"DatetimeIndex slicing with string labels is INCLUSIVE on both ends, like .loc[]. This is different from integer iloc slicing. df['2023-10-25':'2023-10-26'] includes all rows on both Oct 25 AND Oct 26."},
      {q:"df.between_time('09:00','10:00') returns rows where:",opts:["Date is between Sep and Oct","Time component is between 09:00 and 10:00 (across ALL dates)","Price is between 9 and 10","Rows at exactly 09:00 and 10:00 only"],correct:1,explain:"between_time() filters on the TIME portion of the DatetimeIndex, regardless of the date. It is used to extract a daily time window (e.g., market hours) across all days in the dataset."},
      {q:"df.index.dayofweek returns 3 -- what day is this?",opts:["Tuesday","Wednesday","Thursday","Friday"],correct:2,explain:"Monday=0, Tuesday=1, Wednesday=2, Thursday=3, Friday=4, Saturday=5, Sunday=6. dayofweek=3 is Thursday."}],
    openChallenges:[{q:"From the stock dataset, use a date range slice to get Oct 25-26 data. Then filter within that slice to only rows where Hour == 10 (10:30 trades). Compare with between_time('10:00','10:59').",hint:"oct2526 = df['2023-10-25':'2023-10-26']. Then oct2526[oct2526.index.hour == 10].",solution:"oct2526 = df['2023-10-25':'2023-10-26']\nprint(oct2526[oct2526.index.hour == 10])\n# Equivalent:\nprint(df.between_time('10:00','10:59'))"},
      {q:"Add columns: 'is_morning' (hour < 12), 'is_weekday' (dayofweek < 5), 'day_abbr' (first 3 chars of day_name). Filter to only morning weekday trades.",hint:"df.index.hour, df.index.dayofweek, df.index.day_name().str[:3]. Then filter where both is_morning and is_weekday are True.",solution:"df['is_morning'] = df.index.hour < 12\ndf['is_weekday'] = df.index.dayofweek < 5\ndf['day_abbr']   = df.index.day_name().str[:3]\nprint(df[df['is_morning'] & df['is_weekday']])"}],
    experiments:[{title:"Exp 1: Date string slicer",desc:"Enter a partial date string. See which rows it matches.",inputs:[{id:"dstr",label:"Date string",val:"2023-10-26",type:"text",w:"160px"}],runId:"tsl_slice"},
      {title:"Exp 2: Time-of-day filter",desc:"Filter by hour. See which trades match.",inputs:[{id:"hour",label:"Hour (0-23)",val:"9",type:"number",w:"60px"}],runId:"tsl_hour"}],
    mistakes:[{title:"Slicing string dates without DatetimeIndex",wrong:"df['2023-10-26']   # KeyError if index is 0,1,2...\n# Only works when index IS a DatetimeIndex",fix:"df['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\ndf['2023-10-26']   # now works",why:"Partial string slicing ('2023-10-26') only works when the INDEX is a DatetimeIndex. With integer or string index, Pandas looks for a column named '2023-10-26'. Always set_index() before temporal slicing."},
      {title:"DatetimeIndex range slice is inclusive -- off-by-one",wrong:"df['2023-10-25':'2023-10-25']  # intended: Oct 25 only\n# But actually returns all rows from Oct 25 00:00 to Oct 25 23:59\n# Watch out with precise timestamp ranges",fix:"df['2023-10-25']  # single date -- returns same day\n# For precise ranges:\ndf.between_time('09:30','16:00')  # time window",why:"DatetimeIndex slicing is INCLUSIVE on both ends AND expands partial strings to full periods. '2023-10-25' alone returns all rows on Oct 25. The exclusive-stop convention of integer slicing does NOT apply."}],
  },
  {
    id:"resample",
    icon:"RES",
    title:"Resampling",
    desc:"Downsample and upsample time series with resample()",
    xpReward:60,
    chapter:7,
    subtopic:"7.3 Resampling",
    theory:[{title:"What is Resampling?",content:"resample() is groupby() for time frequencies. It groups all rows falling within each time bucket and applies an aggregation. Downsampling reduces frequency (hourly -> daily). Upsampling increases frequency (daily -> hourly), creating NaN for new intervals.",analogy:"Downsampling is like summarising 365 daily weather readings into 12 monthly averages. Upsampling is like interpolating hourly readings from daily averages -- you are adding new time slots that need to be filled.",},
      {title:"Frequency Aliases",content:"Resample uses string aliases to specify the target frequency.",points:["'h' or 'H' -- hourly (use 'h' in Pandas 2.2+)","'D' -- calendar daily","'B' -- business days only","'W' -- weekly (ends Sunday by default)","'ME' -- month end (use 'ME' in Pandas 2.2+, not 'M')","'QE' -- quarter end","'YE' or 'A' -- year end","'min' -- minutes, '30min' -- 30-minute bars","'2h' -- 2-hour bars, '15min' -- 15-minute bars"],},
      {title:"Downsampling -- Aggregation",content:"After resample(), apply any aggregation: mean, sum, max, min, count, ohlc (open-high-low-close for finance).",points:["df.resample('D').mean() -- daily mean","df.resample('D').agg({'Price':'max','Volume':'sum'}) -- per-column agg","df['Price'].resample('D').ohlc() -- OHLC candlestick data","df.resample('D').count() -- count observations per day","df.resample('W').first() -- first value of each week"],},
      {title:"Upsampling -- Filling",content:"Upsampling creates new time slots with NaN. Fill them with forward fill, backward fill, or interpolation.",points:["df.resample('h').mean() -- add hourly slots","df.resample('h').ffill() -- forward fill NaN","df.resample('h').bfill() -- backward fill NaN","df.resample('h').interpolate('linear') -- linear interpolation","df.resample('h').fillna('nearest') -- nearest neighbour"],},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Candlestick Charts",body:"df['Price'].resample('D').ohlc() -- daily Open/High/Low/Close from tick data"},{icon:"SRV",title:"Server Metrics",body:"df.resample('5min').mean() -- 5-minute averages from per-second logs"},{icon:"EC",title:"Sales Reports",body:"df.resample('ME').sum() -- monthly revenue from daily transactions"},{icon:"WX",title:"Climate Data",body:"df.resample('YE').agg({'temp':'mean','rain':'sum'}) -- annual summary"}],}],
    code:"import pandas as pd\n\ndata = {\n    'Date':   ['2023-10-25 09:30:00','2023-10-25 10:30:00',\n               '2023-10-26 09:30:00','2023-10-26 10:30:00',\n               '2023-10-27 16:00:00'],\n    'Price':  [150.50, 151.25, 149.80, 152.00, 155.10],\n    'Volume': [1000, 1200, 900, 1500, 2000]\n}\ndf = pd.DataFrame(data)\ndf['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\n\n# Daily DOWNSAMPLING -- different agg per column\ndaily = df.resample('D').agg({\n    'Price':  'max',\n    'Volume': 'sum'\n})\nprint('Daily (max Price, sum Volume):')\nprint(daily)\n\n# OHLC -- finance standard\nprint('\\nOHLC candlestick data:')\nprint(df['Price'].resample('D').ohlc())\n\n# Count observations per day\nprint('\\nTrades per day:')\nprint(df.resample('D').count())\n\n# Mean across all columns by day\nprint('\\nDaily mean:')\nprint(df.resample('D').mean().round(2))\n\n# UPSAMPLING -- hourly (many NaN created)\nhourly = df.resample('h').mean()\nprint('\\nUpsampled to hourly (first 6):')\nprint(hourly.head(6))\n\n# Forward fill the NaN\nprint('\\nAfter ffill:')\nprint(df.resample('h').ffill().head(6))",
    purePython:{title:"Time-based aggregation without Pandas",comparisons:[{task:"Compute daily max price and total volume from hourly records",pyCode:"from collections import defaultdict\nfrom datetime import datetime\n\ndaily_max = defaultdict(float)\ndaily_vol = defaultdict(int)\n\nfor row in data:\n    day = datetime.fromisoformat(\n        row['Date']\n    ).date()\n    daily_max[day] = max(\n        daily_max[day], row['Price']\n    )\n    daily_vol[day] += row['Volume']\n\nfor day in sorted(daily_max):\n    print(day, daily_max[day], daily_vol[day])",pdCode:"df.resample('D').agg({\n    'Price':  'max',\n    'Volume': 'sum'\n})",verdict:"Pure Python: manual defaultdict per aggregation, manual date extraction, manual comparison for max. resample().agg() handles grouping, multiple aggregations, and result alignment in one expression.",saved:"~85% fewer lines"},
        {task:"Generate every hour between two timestamps (upsampling)",pyCode:"from datetime import datetime, timedelta\n\nstart = datetime(2023,10,25,9,30)\nend   = datetime(2023,10,27,16,0)\nhours = []\ncurrent = start\nwhile current <= end:\n    hours.append(current)\n    current += timedelta(hours=1)\n# Still a list -- no NaN, no ffill, no merge",pdCode:"df.resample('h').mean()\n# Creates rows for every hour\n# NaN where no data exists\n# .ffill() to fill gaps",verdict:"Pure Python: manual datetime arithmetic in a while loop, no connection to existing data, no automatic NaN handling. resample() with upsampling does all this and aligns with the original DataFrame automatically.",saved:"~90% fewer lines"}]},
    quiz:[{q:"df.resample('D').mean() on hourly data with 2 rows on Oct 25 and 2 on Oct 26 returns:",opts:["4 rows unchanged","2 rows -- one mean per day","1 row -- mean of all data","Error -- requires DatetimeIndex"],correct:1,explain:"resample('D') groups by calendar day, so 4 rows over 2 days yields 2 rows -- one per day. It requires a DatetimeIndex (which is why set_index() is always done first)."},
      {q:"The correct Pandas 2.2+ alias for monthly resampling is:",opts:["'M'","'Month'","'ME'","'Monthly'"],correct:2,explain:"In Pandas 2.2+, 'M' was deprecated in favour of 'ME' (Month End) to be explicit about the offset type. Using 'M' in newer versions raises a FutureWarning. Use 'MS' for Month Start."},
      {q:"df.resample('h').ffill() after upsampling does what to NaN cells?",opts:["Fills with column mean","Copies the NEXT known value backward","Copies the LAST known value forward","Drops NaN rows"],correct:2,explain:"ffill() = forward fill -- copies the PREVIOUS valid value into subsequent NaN cells. For time series, this means 'carry the last known price forward until the next recorded price'. bfill() does the opposite."},
      {q:"df['Price'].resample('D').ohlc() returns columns:",opts:["mean, std, min, max","open, high, low, close","first, last, count, sum","year, month, day, hour"],correct:1,explain:"ohlc() is a finance-specific aggregation: open=first value of period, high=max, low=min, close=last value. Used to build candlestick charts from tick or intraday data."}],
    openChallenges:[{q:"Resample the stock dataset to hourly frequency. How many NaN rows are created? Use ffill() to fill them. Then resample the filled data back to daily and compare with the original daily max -- are they the same?",hint:"df.resample('h').mean() -- count NaN rows. Then .ffill(). Then .resample('D').max(). Compare with df.resample('D')['Price'].max().",solution:"hourly = df.resample('h').mean()\nprint('NaN rows:', hourly.isna().sum().sum())\nfilled = df.resample('h').ffill()\nprint(filled.resample('D')['Price'].max())\nprint(df.resample('D')['Price'].max())"},
      {q:"Using ohlc() resample, compute daily OHLC for the Price column. Manually verify the 'open' (first price of day) and 'close' (last price of day) for Oct 25.",hint:"df['Price'].resample('D').ohlc(). Oct 25 open = 150.50 (09:30), close = 151.25 (10:30).",solution:"ohlc = df['Price'].resample('D').ohlc()\nprint(ohlc)\n# Oct 25: open=150.50, high=151.25, low=150.50, close=151.25\n# open = first trade (09:30)\n# close = last trade (10:30)"}],
    experiments:[{title:"Exp 1: Resample frequency picker",desc:"Change the resample frequency. See how many rows result.",inputs:[{id:"freq",label:"Frequency (D/h/W/ME)",val:"D",type:"text",w:"80px"},{id:"aggfn",label:"aggfunc (mean/sum/max/count)",val:"mean",type:"text",w:"100px"}],runId:"res_freq"},
      {title:"Exp 2: Upsample fill strategy",desc:"Upsample to hourly. Choose fill method.",inputs:[{id:"fill",label:"Fill (ffill/bfill/none)",val:"ffill",type:"text",w:"90px"}],runId:"res_fill"}],
    mistakes:[{title:"resample() without DatetimeIndex",wrong:"df.resample('D').mean()\n# TypeError: Only valid with DatetimeIndex or TimedeltaIndex",fix:"df['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\ndf.resample('D').mean()  # works",why:"resample() needs to know the TIME VALUE of each row to assign it to the correct bucket. Only a DatetimeIndex provides this. A DataFrame with integer or string index cannot be resampled."},
      {title:"Using deprecated frequency aliases",wrong:"df.resample('M').sum()   # FutureWarning in Pandas 2.2\ndf.resample('H').mean()  # FutureWarning in Pandas 2.2",fix:"df.resample('ME').sum()   # Month End\ndf.resample('h').mean()   # lowercase hour\ndf.resample('YE').sum()   # Year End",why:"Pandas 2.2 introduced lowercase and explicit-suffix aliases: 'h' replaces 'H', 'ME' replaces 'M', 'YE' replaces 'A'. Using old aliases raises FutureWarning and will error in future versions."}],
  },
  {
    id:"shift_rolling",
    icon:"ROL",
    title:"Shift, Rolling & Timedelta",
    desc:"Period comparison, moving averages, and time arithmetic",
    xpReward:55,
    chapter:7,
    subtopic:"7.4 Shift, Rolling & Timedelta",
    theory:[{title:".shift() -- Period-over-Period Comparison",content:".shift(n) moves all values DOWN by n rows (positive) or UP (negative). The vacated rows become NaN. Used to align a column with its own past or future values in the same row.",points:["df['Price'].shift(1) -- previous period price in same row","df['Price'].shift(-1) -- next period price in same row","df['Change'] = df['Price'] - df['Price'].shift(1) -- absolute change","df['Pct_Change'] = df['Price'].pct_change() -- % change (built-in)","shift(1, freq='D') -- shift by 1 DAY in time, not 1 row"],},
      {title:"pct_change() -- Percentage Change",content:"df['col'].pct_change() is shorthand for (x - x.shift(1)) / x.shift(1). Returns the period-over-period percentage change as a decimal (0.02 = 2% increase).",points:["df['Price'].pct_change() -- decimal pct change","df['Price'].pct_change() * 100 -- percentage","df['Price'].pct_change(periods=3) -- compare to 3 periods ago","First row is always NaN (no previous period)"],},
      {title:"Rolling Windows",content:"df['col'].rolling(window=N) creates a sliding window of N periods. Aggregations are computed over each window. Result has N-1 NaN at the start (not enough data for the first windows).",points:["df['Price'].rolling(3).mean() -- 3-period moving average","df['Price'].rolling(3).std() -- rolling standard deviation","df['Price'].rolling(3).max() -- rolling maximum","df['Volume'].rolling(7).sum() -- 7-period cumulative volume","rolling(3, min_periods=1) -- allow windows smaller than 3 at start"],},
      {title:"Timedelta -- Time Arithmetic",content:"Subtracting two datetime values gives a Timedelta. Adding a Timedelta to a datetime gives a new datetime. Pandas also has date_range() for generating datetime sequences.",points:["df.index.max() - df.index.min() -- total time span","pd.Timedelta(days=1) -- 1 day as Timedelta","df.index + pd.Timedelta(hours=2) -- shift index by 2 hours","pd.date_range('2023-01-01', periods=365, freq='D') -- full year"],},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Technical Analysis",body:"pct_change() for returns, rolling(20).mean() for 20-day MA, rolling(20).std() for Bollinger Bands"},{icon:"SRV",title:"Anomaly Detection",body:"rolling(60).mean() baseline vs current value -- spike = anomaly"},{icon:"EC",title:"MoM Growth",body:"df.resample('ME').sum()['revenue'].pct_change() -- month-over-month"},{icon:"LOG",title:"SLA Monitoring",body:"delivery_date - order_date -- Timedelta -- flag > 2 days"}],}],
    code:"import pandas as pd\n\ndata = {\n    'Date':   ['2023-10-25 09:30:00','2023-10-25 10:30:00',\n               '2023-10-26 09:30:00','2023-10-26 10:30:00',\n               '2023-10-27 16:00:00'],\n    'Price':  [150.50, 151.25, 149.80, 152.00, 155.10],\n    'Volume': [1000, 1200, 900, 1500, 2000]\n}\ndf = pd.DataFrame(data)\ndf['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\n\n# shift() -- previous period price\ndf['Prev_Price'] = df['Price'].shift(1)\ndf['Change']     = df['Price'] - df['Prev_Price']\ndf['Pct_Change'] = df['Price'].pct_change().round(4)\nprint('Shift + change columns:')\nprint(df[['Price','Prev_Price','Change','Pct_Change']])\n\n# Rolling windows\ndf['MA2']    = df['Price'].rolling(2).mean()\ndf['RollSD'] = df['Price'].rolling(3).std().round(3)\nprint('\\nRolling windows:')\nprint(df[['Price','MA2','RollSD']])\n\n# Timedelta arithmetic\nspan = df.index.max() - df.index.min()\nprint(f'\\nTime span: {span}')\nprint(f'In hours: {span.total_seconds()/3600:.1f}h')\n\n# date_range -- generate a sequence\nfuture_dates = pd.date_range(\n    start=df.index.max(),\n    periods=5,\n    freq='D'\n)\nprint('\\nNext 5 trading days (raw):')\nprint(future_dates)\n\n# pct_change with longer period\nprint('\\npct_change(periods=2) -- compare to 2 steps ago:')\nprint(df['Price'].pct_change(periods=2).round(4))",
    purePython:{title:"Rolling windows and period comparison without Pandas",comparisons:[{task:"Calculate a 3-period moving average of prices",pyCode:"prices = [150.50,151.25,149.80,152.00,155.10]\nwindow = 3\nma = []\n\nfor i in range(len(prices)):\n    if i < window - 1:\n        ma.append(None)  # not enough data\n    else:\n        chunk = prices[i-window+1:i+1]\n        ma.append(sum(chunk)/len(chunk))\n\nprint(ma)",pdCode:"df['Price'].rolling(3).mean()",verdict:"Pure Python: manual window slicing, manual None for insufficient data, manual mean computation. rolling(N).mean() handles all edge cases (NaN for first N-1 rows), is vectorised, and chains with .std(), .max(), .sum() trivially.",saved:"~80% fewer lines"},
        {task:"Calculate period-over-period percentage change",pyCode:"prices = [150.50,151.25,149.80,152.00,155.10]\npct = [None]  # first row has no previous\nfor i in range(1, len(prices)):\n    change = (prices[i]-prices[i-1])/prices[i-1]\n    pct.append(round(change, 4))",pdCode:"df['Price'].pct_change().round(4)",verdict:"Pure Python: loop with index tracking, manual formula, manual None for first row. pct_change() is one method, handles NaN, periods= for longer lookback, fill_method= for NaN handling before calculation.",saved:"~75% fewer lines"}]},
    quiz:[{q:"df['Price'].shift(1) -- the FIRST row's value is:",opts:["The same as original","0","NaN -- there is no previous period","The last row's value"],correct:2,explain:"shift(1) moves all values DOWN one row. The first row has no previous value to pull from, so it becomes NaN. If you shift(-1), the LAST row becomes NaN instead."},
      {q:"df['Price'].rolling(3).mean() -- the first TWO rows are:",opts:["The same as the original prices","0","NaN -- not enough data for a 3-period window","The cumulative mean so far"],correct:2,explain:"rolling(3) needs 3 values to compute a window mean. Rows 0 and 1 each have fewer than 3 preceding values, so they are NaN. The first valid result appears at row 2 (using rows 0, 1, 2). Use min_periods=1 to allow smaller windows."},
      {q:"df.index.max() - df.index.min() returns:",opts:["An integer (number of rows)","A Timedelta object showing the time span","A DatetimeIndex","The last date as a string"],correct:1,explain:"Subtracting two datetime64 values yields a Timedelta -- the duration between them. Timedelta has .days, .seconds, .total_seconds(), and displays as '2 days 06:30:00'. This is used for SLA, lead time, and duration calculations."},
      {q:"df['Price'].pct_change(periods=3) at row 4 compares price at row 4 to:",opts:["Row 3","Row 1","Row 7","Row 0"],correct:1,explain:"pct_change(periods=3) computes (current - current.shift(3)) / current.shift(3). At row 4 (0-indexed), this compares to row 4-3 = row 1. The first 3 rows will be NaN."}],
    openChallenges:[{q:"Calculate: (a) 2-period moving average of Price, (b) rolling std of Volume (window=3), (c) cumulative volume using expanding().sum(). Print all three alongside Price and Volume.",hint:"rolling(2).mean(), rolling(3).std(), expanding().sum(). expanding() grows from row 0 to current -- cumulative aggregation.",solution:"df['MA2'] = df['Price'].rolling(2).mean()\ndf['Vol_Std3'] = df['Volume'].rolling(3).std().round(1)\ndf['Cum_Vol'] = df['Volume'].expanding().sum()\nprint(df[['Price','Volume','MA2','Vol_Std3','Cum_Vol']])"},
      {q:"Use pd.date_range() to create a full trading calendar for November 2023 (business days only, freq='B'). How many trading days are there? Merge with the stock dataset to see which of our 5 records fall on business days.",hint:"pd.date_range('2023-11-01', '2023-11-30', freq='B'). For merging, use df.index.isin(biz_dates).",solution:"biz = pd.date_range('2023-11-01','2023-11-30', freq='B')\nprint(f'Business days in Nov 2023: {len(biz)}')\n# Check if any of our 5 trades are on biz days\noct_biz = pd.date_range('2023-10-01','2023-10-31', freq='B')\ndf['is_biz_day'] = df.index.normalize().isin(oct_biz)\nprint(df[['Price','is_biz_day']])"}],
    experiments:[{title:"Exp 1: shift() direction and lag",desc:"Shift prices by N periods. Positive = look back, negative = look forward.",inputs:[{id:"n",label:"Shift by (e.g. 1 or -1)",val:"1",type:"number",w:"70px"}],runId:"rol_shift"},
      {title:"Exp 2: Rolling window size",desc:"Change the rolling window. See how the moving average smooths the price.",inputs:[{id:"w",label:"Window size (2-5)",val:"2",type:"number",w:"60px"}],runId:"rol_window"}],
    mistakes:[{title:"Using shift() result without NaN handling",wrong:"df['Change'] = df['Price'] - df['Price'].shift(1)\ndf['Change'].mean()  # NaN propagates if not handled",fix:"df['Change'] = df['Price'] - df['Price'].shift(1)\ndf['Change'].mean()         # skipna=True by default -- OK\ndf['Change'].fillna(0)      # OR fill first row with 0",why:"shift() creates NaN in the first row. Pandas aggregation (mean, sum) skips NaN by default so .mean() is fine. But operations like cumsum() or filling into other calculations may propagate NaN unexpectedly. Always check with .isna().sum()"},
      {title:"Rolling window larger than the dataset",wrong:"df['MA10'] = df['Price'].rolling(10).mean()\n# All NaN! Only 5 rows, window=10\nprint(df['MA10'])  # 5 NaN values",fix:"# Either reduce window to <= number of rows:\ndf['MA3'] = df['Price'].rolling(3).mean()\n# OR allow partial windows:\ndf['MA10'] = df['Price'].rolling(10, min_periods=1).mean()",why:"rolling(N).mean() requires at least N data points per window. If window > len(df), all results are NaN. Use min_periods=1 to allow partial windows, or choose a window appropriate for your dataset length."}],
  },
  // CHAPTER 8 - Visualisation (coming soon)
  {
    id:"viz_intro",
    icon:"VIZ",
    title:"Visualisation Overview",
    desc:"Plotting basics with Pandas and Matplotlib",
    xpReward:50,
    chapter:8,
    subtopic:"8.1 Plotting Basics",
    theory:[{title:"Why Visualise with Pandas?",content:"Pandas integrates with Matplotlib for quick, exploratory plots directly from DataFrames and Series. Syntax: df.plot(kind='line') or df['col'].plot.hist(). Perfect for EDA before sophisticated custom plots.",analogy:"Pandas plotting is like taking a photo with your phone. Fine for everyday use. For a professional photoshoot, you switch to Matplotlib/Seaborn for custom controls. Pandas plotting is built on Matplotlib anyway.",},
      {title:"Basic Plot Types",points:["df.plot.line() -- line plot (default, use for time series)","df.plot.bar() / df.plot.barh() -- bar/barh for categorical","df.plot.hist(bins=20) -- histogram of distribution","df.plot.scatter(x='col1', y='col2') -- scatter plot","df.plot.box() -- boxplot to show spread and outliers","df.plot.area() -- area chart for cumulative totals","df.plot.pie(y='col') -- pie chart (use sparingly)","df.plot.kde() -- kernel density estimate"],},
      {title:"Customising Plots",points:["df.plot(title='My Plot') -- add title","df.plot(xlabel='X', ylabel='Y') -- axis labels","df.plot(figsize=(12,6)) -- figure size","df.plot(alpha=0.5, grid=True) -- transparency, grid","df.plot(color='red', linestyle='--') -- line style","plt.suptitle('Title') / plt.legend(loc='upper left') -- from matplotlib"],},
      {title:"Multiple Plots",points:["df.plot(subplots=True, layout=(2,3)) -- separate subplots per column","df.plot(secondary_y='revenue') -- second y-axis","plt.subplots(nrows=2, ncols=2) then axs[0].plot(...) -- manual grid","df.groupby('cat')['value'].plot.legend() -- groupby plots"],},
      {title:"Use Cases",useCases:[{icon:"FIN",title:"Stock Price",body:"df['Price'].plot.line(title='Stock Price')"},{icon:"EDU",title:"Grade Distribution",body:"df['Score'].plot.hist(bins=20, alpha=0.7)"},{icon:"EC",title:"Sales Analysis",body:"df.groupby('Quarter')['Revenue'].sum().plot.bar()"},{icon:"SCI",title:"Correlation",body:"pd.plotting.scatter_matrix(df) -- pairwise scatter"}],}],
    code:"import pandas as pd\nimport matplotlib.pyplot as plt\n\ndata = {\n    'Date':   ['2023-10-25','2023-10-26','2023-10-27','2023-10-28','2023-10-29'],\n    'Price':  [150.50, 151.25, 149.80, 152.00, 155.10],\n    'Volume': [1000, 1200, 900, 1500, 2000]\n}\ndf = pd.DataFrame(data)\ndf['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\n\n# Line plot (default)\ndf['Price'].plot(title='Stock Price Trend', xlabel='Date', ylabel='Price ($)', grid=True)\nplt.show()\n\n# Bar chart of Volume\ndf['Volume'].plot.bar(title='Daily Volume', xlabel='Date', ylabel='Volume')\nplt.show()\n\n# Histogram of Prices\ndf['Price'].plot.hist(bins=5, alpha=0.7, title='Price Distribution', xlabel='Price ($)', ylabel='Frequency')\nplt.show()\n\n# Subplots: Price and Volume\nfig, axes = plt.subplots(2, 1, figsize=(10,8))\ndf['Price'].plot(ax=axes[0], title='Price', color='blue')\ndf['Volume'].plot(ax=axes[1], title='Volume', color='orange')\nplt.tight_layout()\nplt.show()\n\n# Scatter plot: Price vs Volume\ndf.plot.scatter(x='Price', y='Volume', title='Price vs Volume', xlabel='Price ($)', ylabel='Volume')\nplt.show()",
    purePython:{title:"Plotting without Pandas (using Matplotlib directly)",comparisons:[{task:"Create a line plot from a DataFrame column",pyCode:"import matplotlib.pyplot as plt\n\n# Extract lists\nprices = [150.50,151.25,149.80,152.00,155.10]\ndates = ['2023-10-25','2023-10-26','2023-10-27','2023-10-28','2023-10-29']\n\nplt.plot(dates, prices)\nplt.title('Stock Price Trend')\nplt.xlabel('Date')\nplt.ylabel('Price ($)')\nplt.grid(True)\nplt.show()",pdCode:"df['Price'].plot.line(title='Stock Price Trend', xlabel='Date', ylabel='Price ($)', grid=True)\nplt.show()",verdict:"Pure Python: manually extract lists, pass to plt.plot, set all labels. Pandas plot integrates with column names, index as x-axis, and chains all customisations. For groupby plots or multiple columns, Pandas saves many lines.",saved:"~60% fewer lines"},
        {task:"Create a subplot grid of two columns",pyCode:"import matplotlib.pyplot as plt\n\nprices = [150.50,151.25,149.80,152.00,155.10]\nvolumes = [1000,1200,900,1500,2000]\n\nfig, axes = plt.subplots(2,1, figsize=(10,8))\naxes[0].plot(prices, color='blue')\naxes[0].set_title('Price')\naxes[1].plot(volumes, color='orange')\naxes[1].set_title('Volume')\nplt.tight_layout()\nplt.show()",pdCode:"fig, axes = plt.subplots(2,1, figsize=(10,8))\ndf['Price'].plot(ax=axes[0], title='Price', color='blue')\ndf['Volume'].plot(ax=axes[1], title='Volume', color='orange')\nplt.tight_layout()\nplt.show()",verdict:"Pure Python: manual list extraction, separate lines. Pandas supports ax= parameter directly, keeping data alignment automatic. For 10+ subplots, Pandas saves substantial boilerplate.",saved:"~50% fewer lines"}]},
    quiz:[{q:"df.plot() without any arguments defaults to:",opts:["Bar chart","Histogram","Line plot","Scatter plot"],correct:2,explain:"df.plot() defaults to kind='line', creating a line plot with the index as x-axis and each numeric column as separate lines. This is great for time series."},
      {q:"To create a histogram of the 'Price' column, you use:",opts:["df.plot.hist('Price')","df['Price'].plot.hist()","df.hist('Price')","df['Price'].hist()"],correct:1,explain:"Both df['Price'].plot.hist() and df['Price'].plot(kind='hist') work. The .hist() method is also available: df['Price'].hist(). But the .plot prefix is the consistent API."},
      {q:"df.plot.scatter(x='a', y='b') creates a scatter plot. To add a third dimension (colour by column), use:",opts:["c=df['c']","colorby=df['c']","hue='c'","size='c'"],correct:0,explain:"scatter method accepts c= parameter for colour mapping: df.plot.scatter(x='a', y='b', c=df['c']) colours points by column 'c'. There's no 'hue' in pandas scatter (use Seaborn for that)."},
      {q:"To show a grid and set transparency on a plot, you pass:",opts:["grid('on'), alpha(0.5)","grid=True, alpha=0.5","add_grid=True, alpha=0.5","show_grid, opacity"],correct:1,explain:"grid=True adds the grid, alpha=0.5 sets transparency. Both are parameters of the .plot() method."}],
    openChallenges:[{q:"Using the stock dataset, plot Price and Volume on separate subplots with shared x-axis (dates). Add a title 'Stock Analysis' and save the figure as 'stock_analysis.png'.",hint:"fig, axes = plt.subplots(2,1, sharex=True, figsize=(10,6)). Use df['Price'].plot(ax=axes[0]), df['Volume'].plot(ax=axes[1]). fig.suptitle('Stock Analysis'). fig.savefig('stock_analysis.png').",solution:"fig, axes = plt.subplots(2,1, sharex=True, figsize=(10,6))\ndf['Price'].plot(ax=axes[0], title='Price', color='blue')\ndf['Volume'].plot(ax=axes[1], title='Volume', color='orange')\nfig.suptitle('Stock Analysis')\nplt.tight_layout()\nplt.savefig('stock_analysis.png')\nplt.show()"},
      {q:"Create a histogram of Prices with 10 bins, then overlay a kernel density estimate (KDE) using df['Price'].plot.kde(). Use alpha=0.5 for transparency. Add a legend to distinguish hist and KDE.",hint:"df['Price'].plot.hist(bins=10, alpha=0.5, label='Histogram') then df['Price'].plot.kde(label='KDE'). plt.legend().",solution:"ax = df['Price'].plot.hist(bins=10, alpha=0.5, label='Histogram')\ndf['Price'].plot.kde(ax=ax, label='KDE', color='red')\nplt.title('Price Distribution')\nplt.xlabel('Price ($)')\nplt.ylabel('Frequency')\nplt.legend()\nplt.show()"}],
    experiments:[{title:"Exp 1: Plot type switcher",desc:"Choose a plot kind (line/bar/hist/scatter) and see the code.",inputs:[{id:"kind",label:"Kind (line/bar/hist/scatter)",val:"line",type:"text",w:"130px"}],runId:"viz_kind"},
      {title:"Exp 2: Histogram bins",desc:"Set number of bins for histogram of Prices.",inputs:[{id:"bins",label:"Bins",val:"5",type:"number",w:"60px"}],runId:"viz_bins"}],
    mistakes:[{title:"Calling plt.show() before customising",wrong:"df.plot()\nplt.show()\nplt.title('Title')  # Too late! Won't show on existing figure",fix:"df.plot()\nplt.title('Title')\nplt.show()  # Title appears",why:"plt.show() displays the current figure and clears it. All customisations (title, labels, legend) must happen BEFORE plt.show(), not after. Order matters."},
      {title:"Plotting with string dates not converted",wrong:"df.plot(x='Date') where Date is object dtype string\n# Dates treated as categories, x-axis labels may overlap",fix:"df['Date'] = pd.to_datetime(df['Date'])\ndf.set_index('Date', inplace=True)\ndf.plot()  # correct",why:"Pandas plots date columns as strings, leading to all category labels equally spaced. After converting to datetime and setting as index, the x-axis gains proper spacing and formatting."}],
  }
];

// Helper function to get lessons by chapter
function byChapter(ch) {
  return CURRICULUM.filter(c => c.chapter === ch);
}

// ==========================================
// EXPERIMENT RUNNERS
// ==========================================
const RUNNERS = {
  intro_mult: (v) => {
    const m = parseFloat(v.mult) || 1;
    const s = [10,20,30,40];
    return `series * ${m}:\n0    ${s[0]*m}\n1    ${s[1]*m}\n2    ${s[2]*m}\n3    ${s[3]*m}\ndtype: float64\n\nOne operation -- all rows updated!`;
  },
  series_align: (v) => {
    const a = v.s1vals.split(",").map(Number);
    const b = v.s2vals.split(",").map(Number);
    const m1={a:a[0],b:a[1],c:a[2]}, m2={b:b[0],c:b[1],d:b[2]};
    let out = "s1 + s2 (aligned by index):\n";
    ["a","b","c","d"].forEach(k => {
      const v1=m1[k], v2=m2[k];
      if(v1!==undefined&&v2!==undefined) out+=`${k}    ${v1+v2}   (${v1}+${v2})\n`;
      else out+=`${k}    NaN  -- only in s${v1!==undefined?"1":"2"}\n`;
    });
    return out;
  },
  df_col: (v) => {
    const valid={first_name:["Jane","John","Corey","Marie"],last_name:["Doe","Smith","Schafer","Curie"],email:["jane@email.com","john@email.com","corey@email.com","marie@email.com"],age:[34,18,42,66]};
    const col=v.col.trim();
    if(!valid[col]) return `KeyError: '${col}'\nValid columns: first_name, last_name, email, age`;
    return `df['${col}']:\n${valid[col].map((val,i)=>`${i}    ${val}`).join("\n")}\nName: ${col}, dtype: ${col==="age"?"int64":"object"}`;
  },
  index_lociloc: (v) => {
    const p=Math.max(0,Math.min(3,parseInt(v.pos)||0));
    const data=[{fn:"Jane",ln:"Doe",e:"jane@email.com",a:34},{fn:"John",ln:"Smith",e:"john@email.com",a:18},{fn:"Corey",ln:"Schafer",e:"corey@email.com",a:42},{fn:"Marie",ln:"Curie",e:"marie@email.com",a:66}];
    const r=data[p];
    return `.iloc[${p}] -- position ${p}:\nfirst_name    ${r.fn}\nlast_name     ${r.ln}\nage           ${r.a}\n\n.loc["${r.e}"] -- same row by label:\nfirst_name    ${r.fn}\nage           ${r.a}\n\nSame row, two ways!`;
  },
  index_mask: (v) => {
    const min=parseInt(v.min_age)||0;
    const data=[{n:"Jane",a:34},{n:"John",a:18},{n:"Corey",a:42},{n:"Marie",a:66}];
    const f=data.filter(d=>d.a>=min);
    if(!f.length) return `df[df['age'] >= ${min}]:\n(empty -- no rows match)`;
    return `df[df['age'] >= ${min}]:\n${f.map(d=>`  ${d.n.padEnd(8)} ${d.a}`).join("\n")}\n\n${f.length} of 4 rows returned.`;
  },
  multi_outer: (v) => {
    const db={Doe:{fn:"Jane",e:"jane@email.com",a:34},Smith:{fn:"John",e:"john@email.com",a:18},Schafer:{fn:"Corey",e:"corey@email.com",a:42},Curie:{fn:"Marie",e:"marie@email.com",a:66}};
    const name=v.lname.trim();
    const r=db[name];
    if(!r) return `KeyError: "${name}" not in outer index.\nValid: Doe, Smith, Schafer, Curie`;
    return `df.loc["${name}"]:\n             email               age\nfirst_name\n${r.fn.padEnd(12)} ${r.e.padEnd(22)} ${r.a}\n\nOuter level "last_name" collapsed!`;
  },
  csv_usecols: (v) => {
    const all={name:["Riya","Arjun","Priya","Rahul","Meera"],score:[92,78,85,61,95],grade:["A","B","A","C","A"],student_id:["S001","S002","S003","S004","S005"]};
    const req=v.cols.split(",").map(c=>c.trim()).filter(c=>all[c]);
    const inv=v.cols.split(",").map(c=>c.trim()).filter(c=>c&&!all[c]);
    if(!req.length) return `No valid columns.\nAvailable: name, score, grade, student_id`;
    let out=`usecols=${JSON.stringify(req)}\nShape: (5, ${req.length})\n\n`;
    out+=req.join("    ")+"\n";
    for(let i=0;i<5;i++) out+=req.map(c=>String(all[c][i]).padEnd(c.length+4)).join("")+"\n";
    if(inv.length) out+=`\nUnknown columns ignored: ${inv.join(", ")}`;
    out+=`\nRAM saved vs full load: ~${Math.round((1-req.length/4)*100)}%`;
    return out;
  },
  csv_sep: (v) => {
    const sep=v.sep||",";
    const rows=[`name${sep}score${sep}grade`,`Riya${sep}92${sep}A`,`Arjun${sep}78${sep}B`];
    const cols=rows[0].split(sep);
    let out=`Raw file with sep='${sep}':\n`;
    rows.forEach(r=>out+=`  "${r}"\n`);
    out+=`\nParsed as ${cols.length} columns: [${cols.join(", ")}]\n`;
    if(cols.length===1) out+="\nOnly 1 column parsed -- wrong separator!";
    return out;
  },
  fmt_orient: (v) => {
    const o=v.orient.trim();
    const examples={
      records:`orient='records':\n[\n  {"name": "Riya", "score": 92},\n  {"name": "Arjun", "score": 78}\n]\nWeb API standard -- list of dicts`,
      columns:`orient='columns':\n{\n  "name": {"0":"Riya","1":"Arjun"},\n  "score": {"0":92,"1":78}\n}\nDataFrame's internal layout`,
      index:`orient='index':\n{\n  "0": {"name":"Riya","score":92},\n  "1": {"name":"Arjun","score":78}\n}\nDict of rows keyed by index`,
      split:`orient='split':\n{\n  "columns": ["name","score"],\n  "index": [0,1],\n  "data": [["Riya",92],["Arjun",78]]\n}\nMost compact -- no key repetition`,
      values:`orient='values':\n[\n  ["Riya", 92],\n  ["Arjun", 78]\n]\nPure data, no column info`,
    };
    return examples[o]||`Unknown orient: "${o}"\nValid: records, columns, index, split, values`;
  },
  db_filter: (v) => {
    const min=parseInt(v.min_score)||0;
    const data=[{name:"Riya",grade:"A",score:92},{name:"Arjun",grade:"B",score:78},{name:"Priya",grade:"A",score:85},{name:"Rahul",grade:"C",score:61},{name:"Meera",grade:"A",score:95}];
    const f=data.filter(d=>d.score>=min);
    let out=`SQL: SELECT * FROM students WHERE score >= ${min}\nPandas: df[df['score'] >= ${min}]\n\nResult (${f.length} rows):\n${"name".padEnd(10)} ${"grade".padEnd(8)} score\n${"-".repeat(28)}\n`;
    f.forEach(d=>out+=`${d.name.padEnd(10)} ${d.grade.padEnd(8)} ${d.score}\n`);
    return out;
  },
  lf_dtype: (v) => {
    const sizes={int8:1,int16:2,int32:4,int64:8,float16:2,float32:4,float64:8,bool:1,object:50};
    const n=parseInt(v.rows)||1000000;
    const dtype=v.dtype.trim().toLowerCase();
    const bytes=sizes[dtype];
    if(!bytes) return `Unknown dtype: "${dtype}"\nValid: int8, int16, int32, int64, float32, float64, bool, object`;
    const mb=(bytes*n/1e6).toFixed(2);
    const base=(8*n/1e6).toFixed(2);
    const saving=bytes<8?Math.round((1-bytes/8)*100):0;
    return `dtype=${dtype} x ${n.toLocaleString()} rows:\n${mb} MB\nvs default (int64): ${base} MB\nMemory saved: ${saving}%`;
  },
  lf_usecols: (v) => {
    const n=Math.max(1,Math.min(100,parseInt(v.ncols)||5));
    const total=800, load=Math.round(total*n/100), saved=total-load;
    return `Loading ${n} of 100 columns:\nFull file: ~${total} MB\nWith usecols: ~${load} MB\nRAM saved: ~${saved} MB (${Math.round(saved/total*100)}%)\n${n<=10?"Excellent -- column pruning is one of the best tricks!":n<=30?"Good savings":"Consider if you really need all these columns"}`;
  },
  ins_headtail: (v) => {
    const n=Math.max(1,Math.min(6,parseInt(v.n)||3));
    const rows=[["Alice","Engineering",120000,5],["Bob","HR",75000,3],["Charlie","Engineering",110000,4],["David","Sales",90000,2],["Eve","Engineering",130000,8],["Frank","Sales",95000,3]];
    let out=`head(${n}):\nName       Dept          Salary   Yrs\n`;
    rows.slice(0,n).forEach(([n2,d,s,y])=>out+=`${n2.padEnd(10)} ${d.padEnd(14)} ${s}  ${y}\n`);
    out+=`\ntail(${n}):\n`;
    rows.slice(-n).forEach(([n2,d,s,y])=>out+=`${n2.padEnd(10)} ${d.padEnd(14)} ${s}  ${y}\n`);
    return out;
  },
  ins_nunique: (v) => {
    const cols={Name:["Alice","Bob","Charlie","David","Eve","Frank"],Department:["Engineering","HR","Engineering","Sales","Engineering","Sales"],Salary:[120000,75000,110000,90000,130000,95000],Years_Exp:[5,3,4,2,8,3]};
    const col=v.col.trim();
    if(!cols[col]) return `Column "${col}" not found.\nValid: Name, Department, Salary, Years_Exp`;
    const vals=cols[col];
    const counts={};
    vals.forEach(x=>{counts[x]=(counts[x]||0)+1;});
    const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
    let out=`df["${col}"].nunique() = ${Object.keys(counts).length}\n\nvalue_counts():\n`;
    sorted.forEach(([k,v2])=>out+=`${String(k).padEnd(14)} ${v2}  (${(v2/vals.length*100).toFixed(0)}%)\n`);
    return out;
  },
  sel_brackets: (v) => {
    const b=v.brackets.trim().toLowerCase();
    if(b==="single"||b==="s") return `df['Salary']:\nType: Series\n101    120000\n102     75000\n103    110000\n104     90000\n105    130000\n106     95000\nName: Salary, dtype: int64\nshape: (6,)  ndim: 1`;
    if(b==="double"||b==="d") return `df[['Salary']]:\nType: DataFrame\n        Salary\n101    120000\n102     75000\n103    110000\nshape: (6, 1)  ndim: 2`;
    return `Type 'single' or 'double' to compare.`;
  },
  idx_lociloc: (v) => {
    const r=Math.max(0,Math.min(5,parseInt(v.r)||0));
    const c=Math.max(0,Math.min(3,parseInt(v.c)||0));
    const names=["Alice","Bob","Charlie","David","Eve","Frank"];
    const cols=["Name","Department","Salary","Years_Exp"];
    const data=[[101,"Engineering",120000,5],[102,"HR",75000,3],[103,"Engineering",110000,4],[104,"Sales",90000,2],[105,"Engineering",130000,8],[106,"Sales",95000,3]];
    const val=data[r][c];
    return `.iloc[${r}, ${c}]  -> ${val}\n.iat[${r}, ${c}]   -> ${val}  (scalar, fastest)\n\n.loc[${r+101}, '${cols[c]}'] -> ${val}\n.at[${r+101}, '${cols[c]}']  -> ${val}  (scalar, fastest)\n\nRow ${r}: ${names[r]} | Col ${c}: ${cols[c]}`;
  },
  flt_bool: (v) => {
    const min=parseInt(v.sal)||0;
    const dept=(v.dept||"all").trim().toLowerCase();
    const rows=[{n:"Alice",d:"Engineering",s:120000},{n:"Bob",d:"HR",s:75000},{n:"Charlie",d:"Engineering",s:110000},{n:"David",d:"Sales",s:90000},{n:"Eve",d:"Engineering",s:130000},{n:"Frank",d:"Sales",s:95000}];
    let f=rows.filter(r=>r.s>=min);
    if(dept!=="all") f=f.filter(r=>r.d.toLowerCase()===dept);
    let out=`Filter: Salary >= ${min}${dept!=="all"?` AND Department = '${v.dept}'`:""}\n${f.length} of 6 rows match\n\nName       Department     Salary\n${"-".repeat(38)}\n`;
    f.forEach(r=>out+=`${r.n.padEnd(10)} ${r.d.padEnd(15)} ${r.s}\n`);
    if(!f.length) out+=`(empty -- no rows match)\n`;
    return out;
  },
  flt_isin: (v) => {
    const sel=v.depts.split(",").map(s=>s.trim()).filter(Boolean);
    const rows=[{n:"Alice",d:"Engineering"},{n:"Bob",d:"HR"},{n:"Charlie",d:"Engineering"},{n:"David",d:"Sales"},{n:"Eve",d:"Engineering"},{n:"Frank",d:"Sales"}];
    const f=rows.filter(r=>sel.includes(r.d));
    let out=`df[df['Department'].isin(${JSON.stringify(sel)})]\n\n${f.length} rows:\n`;
    f.forEach(r=>out+=`  ${r.n.padEnd(10)} ${r.d}\n`);
    return out;
  },
  flt_contains: (v) => {
    const s=v.substr.toLowerCase();
    const names=["Alice","Bob","Charlie","David","Eve","Frank"];
    const f=names.filter(n=>n.toLowerCase().includes(s));
    let out=`df[df['Name'].str.contains('${v.substr}', case=False)]\n\nMatches: ${f.length}\n`;
    f.forEach(n=>out+=`  ${n}\n`);
    if(!f.length) out+=`  (none -- try a different letter)\n`;
    out+=`\nstr.contains() works on any string column.\nUse regex=True for pattern matching.`;
    return out;
  },
  dup_keep: (v) => {
    const keep=v.keep.trim().toLowerCase();
    const rows=[{id:"101",n:"Jane Doe",a:28},{id:"102",n:"john smith",a:-999},{id:"102",n:"john smith",a:-999},{id:"104",n:"  Alice Jones",a:35},{id:"105",n:"Bob_Brown",a:null},{id:"106",n:"Charlie",a:42}];
    const groups={};
    rows.forEach((r,i)=>{(groups[r.n]||(groups[r.n]=[])).push(i);});
    let kept=new Set();
    if(keep==="first"){rows.forEach((r,i)=>{if(groups[r.n][0]===i)kept.add(i);});}
    else if(keep==="last"){rows.forEach((r,i)=>{if(groups[r.n][groups[r.n].length-1]===i)kept.add(i);});}
    else{rows.forEach((r,i)=>{if(groups[r.n].length===1)kept.add(i);});}
    let o=`keep='${keep}' -- ${kept.size} rows kept:\n\n Idx  ID    Name              Age\n${"--".repeat(22)}\n`;
    rows.forEach((r,i)=>{const mark=kept.has(i)?" ":" X";o+=`[${i}]${mark}  ${r.id}  ${r.n.padEnd(18)} ${r.a===null?"NaN":r.a}\n`;});
    o+=`\nX = dropped`;
    return o;
  },
  dup_subset: (v) => {
    const col=v.col.trim();
    const valid=["CustomerID","Name","Phone"];
    const rows=[{CustomerID:"101",Name:"Jane Doe",Phone:"555-1234"},{CustomerID:"102",Name:"john smith",Phone:"555-5678"},{CustomerID:"102",Name:"john smith",Phone:"555-5678"},{CustomerID:"104",Name:"Alice Jones",Phone:"N/A"},{CustomerID:"105",Name:"Bob_Brown",Phone:"555-9999"},{CustomerID:"106",Name:"Charlie",Phone:"555-0000"}];
    if(!valid.includes(col)) return `Column "${col}" not valid.\nTry: CustomerID, Name, Phone`;
    const seen=new Set();
    const result=rows.filter(r=>{const k=r[col];if(seen.has(k))return false;seen.add(k);return true;});
    return `drop_duplicates(subset=['${col}'])\n\nOriginal: 6 rows\nAfter: ${result.length} rows\n\nKept rows:\n${result.map((r,i)=>`  ${r.CustomerID}  ${r.Name}`).join("\n")}`;
  },
  str_clean: (v) => {
    const n=v.name||"";
    const c=v.case.trim().toLowerCase();
    let result=n.trim().replace(/_/g," ");
    if(c==="title")result=result.replace(/\b\w/g,l=>l.toUpperCase());
    else if(c==="lower")result=result.toLowerCase();
    else if(c==="upper")result=result.toUpperCase();
    return`Input:   "${n}"\nAfter strip:    "${n.trim()}"\nAfter replace_: "${n.trim().replace(/_/g," ")}"\nAfter ${c}():  "${result}"\n\nChain: .str.strip().str.replace('_',' ').str.${c}()`;
  },
  str_contains: (v) => {
    const pat=v.pat;
    const caseSens=v.case_s.trim().toLowerCase()==="yes";
    const names=["Jane Doe","john smith","Alice Jones","Bob_Brown","Charlie"];
    const f=names.filter(n=>caseSens?n.includes(pat):n.toLowerCase().includes(pat.toLowerCase()));
    return`str.contains('${pat}', case=${caseSens})\n\nResults:\n${names.map(n=>`  ${f.includes(n)?"TRUE ":"FALSE"} | ${n}`).join("\n")}\n\n${f.length} of ${names.length} matched.`;
  },
  nan_fill: (v) => {
    const s=v.strategy.trim().toLowerCase();
    const ages=[28,null,null,35,null,42];
    const mean=35;
    let filled=[...ages];
    if(s==="mean")filled=filled.map(a=>a===null?mean:a);
    else if(s==="ffill"){let last=null;filled=filled.map(a=>{if(a===null)return last;last=a;return a;});}
    else if(s==="bfill"){let next=null;filled=[...filled].reverse().map(a=>{if(a===null)return next;next=a;return a;}).reverse();}
    else if(s==="zero")filled=filled.map(a=>a===null?0:a);
    const names=["Jane","Bob","Bob-dup","Alice","Bob_B","Charlie"];
    return`fillna strategy: '${s}'\n\n${"Name".padEnd(12)} Before -> After\n${"-".repeat(30)}\n${names.map((n,i)=>`${n.padEnd(12)} ${ages[i]===null?"NaN    ":String(ages[i]).padEnd(7)} -> ${filled[i]===null?"NaN":filled[i]}`).join("\n")}`;
  },
  nan_sentinel: (v) => {
    const sent=v.sentinel.trim();
    const ages=["28","-999","-999","35","NaN","42"];
    const isMatch=x=>(x===sent)||(sent==="NaN"&&x==="NaN");
    const result=ages.map(a=>isMatch(a)?"NaN":a);
    return`replace(${sent}, np.nan)\n\nBefore: [${ages.join(", ")}]\nAfter:  [${result.join(", ")}]\n\n${result.filter(x=>x==="NaN").length} values replaced with NaN.`;
  },
  typ_errors: (v) => {
    const mode=v.mode.trim().toLowerCase();
    const vals=["150.50","200.00","Free","45.00","120.75"];
    let o=`pd.to_numeric(col, errors='${mode}')\n\nInput:  [${vals.join(", ")}]\n\n`;
    if(mode==="coerce"){o+=`Output: [150.5, 200.0, NaN, 45.0, 120.75]\ndtype: float64\n\n"Free" -> NaN safely.`;}
    else if(mode==="raise"){o+=`Raises ValueError on "Free"!\nNo output -- conversion aborted.\n\nUse errors='coerce' for dirty data.`;}
    else if(mode==="ignore"){o+=`Output: ['150.50','200.00','Free','45.00','120.75']\ndtype: object (unchanged!)\n\nColumn stays string -- math still fails.`;}
    else{o+=`Unknown mode: "${mode}"\nValid: coerce, raise, ignore`;}
    return o;
  },
  typ_memory: (v) => {
    const u=Math.max(1,parseInt(v.uniq)||5);
    const rows=parseInt(v.rows)||1000000;
    const objMB=rows*50/1e6;
    const catMB=(u*50+rows*1)/1e6;
    return`${u} unique values, ${rows.toLocaleString()} rows:\n\nobject dtype:   ${objMB.toFixed(1)} MB\ncategory dtype: ${catMB.toFixed(1)} MB\nSaved: ${((1-catMB/objMB)*100).toFixed(0)}%\n\ncategory: ${u} unique strings stored once\nplus 1-byte integer code per row.\nobject: full Python string per row (~50 bytes).`;
  },
  cat_ignore: (v) => {
    const ig=v.ignore.trim().toLowerCase()==="yes";
    return ig?`pd.concat([sales_q1, sales_q2], ignore_index=True)\n\n   Rep_ID  Name     Sales\n0     101  Alice    25000\n1     102  Bob      30000\n2     103  Charlie  15000\n3     101  Alice    27000\n4     103  Charlie  18000\n5     104  David    22000\n\nIndex: [0,1,2,3,4,5] -- clean!`:`pd.concat([sales_q1, sales_q2])\n\n   Rep_ID  Name     Sales\n0     101  Alice    25000\n1     102  Bob      30000\n2     103  Charlie  15000\n0     101  Alice    27000  <- duplicate index!\n1     103  Charlie  18000\n2     104  David    22000\n\nIndex: [0,1,2,0,1,2] -- duplicates!`;
  },
  cat_axis: (v) => {
    const ax=parseInt(v.axis)||0;
    return ax===0?`pd.concat([df1, df2], axis=0)\nStacks ROWS (vertical)\n\n   Rep_ID  Name     Sales\n0     101  Alice    25000\n1     102  Bob      30000\n2     103  Charlie  15000\n3     101  Alice    27000\n4     103  Charlie  18000\n5     104  David    22000\n\nResult shape: (6, 3)`:`pd.concat([df1, df2], axis=1)\nStacks COLUMNS (horizontal)\n\n   Rep_ID  Name   Sales_Q1  Rep_ID  Name   Sales_Q2\n0     101  Alice  25000      101   Alice    27000\n1     102  Bob    30000      103   Charlie  18000\n2     103  Charlie 15000     104   David    22000\n\nResult shape: (3, 6)\nNote: aligns by INDEX -- mismatch -> NaN`;
  },
  merge_how: (v) => {
    const how=v.how.trim().toLowerCase();
    const results={left:`how='left' -- all Q1 reps + region\n\n  Rep_ID  Name     Sales  Region\n0    101  Alice    25000  North\n1    102  Bob      30000  South\n2    103  Charlie  15000  East\n\n3 rows (all from left=sales_q1)\nRep 104 (West) not in Q1 -- excluded`,inner:`how='inner' -- only matching IDs\n\n  Rep_ID  Name     Sales  Region\n0    101  Alice    25000  North\n1    102  Bob      30000  South\n2    103  Charlie  15000  East\n\n3 rows (IDs 101,102,103 exist in both)\nSame as left here because all Q1 IDs match`,right:`how='right' -- all regions + Q1 where matched\n\n  Rep_ID  Name     Sales  Region\n0    101  Alice    25000  North\n1    102  Bob      30000  South\n2    103  Charlie  15000  East\n3    104  NaN      NaN    West\n\n4 rows -- Rep 104 (West) kept, NaN for missing Q1`,outer:`how='outer' -- all IDs from both tables\n\n  Rep_ID  Name     Sales  Region\n0    101  Alice    25000  North\n1    102  Bob      30000  South\n2    103  Charlie  15000  East\n3    104  NaN      NaN    West\n\n4 rows -- union of all IDs`};
    return results[how]||`Unknown how='${how}'\nValid: left, right, inner, outer`;
  },
  merge_validate: (v) => {
    const val=v.validate.trim();
    const ok=["one_to_one","one_to_many","many_to_one","many_to_many"];
    if(!ok.includes(val)) return`Unknown: "${val}"\nValid: one_to_one, one_to_many, many_to_one, many_to_many`;
    if(val==="one_to_one") return`validate='one_to_one'\n\nChecks: key unique in BOTH tables?\n- sales_q1 Rep_IDs: [101,102,103] -- unique OK\n- regions Rep_IDs: [101,102,103,104] -- unique OK\n\nValidation PASSED\nMerge proceeds safely.`;
    return`validate='${val}'\n\nDocs:\none_to_one   -- unique in both tables\none_to_many  -- unique in left, dup ok in right\nmany_to_one  -- dup ok in left, unique in right\nmany_to_many -- no uniqueness required (risky!)`;
  },
  melt_cols: (v) => {
    const c=v.cols.trim().toLowerCase();
    const data={North:{Q1:25000,Q2:27000},South:{Q1:30000,Q2:32000},East:{Q1:15000,Q2:18000}};
    let rows=[];
    const useQ1=c==="q1"||c==="both",useQ2=c==="q2"||c==="both";
    if(useQ1)Object.entries(data).forEach(([r,d])=>rows.push({Region:r,Quarter:"Q1_Sales",Revenue:d.Q1}));
    if(useQ2)Object.entries(data).forEach(([r,d])=>rows.push({Region:r,Quarter:"Q2_Sales",Revenue:d.Q2}));
    if(!rows.length) return`Enter: Q1, Q2, or both`;
    let o=`melt(id_vars='Region', value_vars=[${useQ1?"'Q1_Sales'":""}${useQ1&&useQ2?",":""}${useQ2?"'Q2_Sales'":""}])\n\n${rows.length} rows:\nRegion  Quarter    Revenue\n`;
    rows.forEach(r=>o+=`${r.Region.padEnd(8)} ${r.Quarter.padEnd(12)} ${r.Revenue}\n`);
    return o;
  },
  melt_names: (v) => {
    return`pd.melt(wide_sales,\n  id_vars='Region',\n  var_name='${v.varn||"Quarter"}',\n  value_name='${v.valn||"Revenue"}')\n\n  Region  ${(v.varn||"Quarter").padEnd(12)} ${v.valn||"Revenue"}\n0  North  Q1_Sales     25000\n1  South  Q1_Sales     30000\n2   East  Q1_Sales     15000\n3  North  Q2_Sales     27000\n4  South  Q2_Sales     32000\n5   East  Q2_Sales     18000`;
  },
  pvt_agg: (v) => {
    const agg=v.agg.trim().toLowerCase();
    const data={Alice:[25000,27000],Bob:[30000],Charlie:[15000,18000],David:[22000]};
    const fns={sum:(arr)=>arr.reduce((a,b)=>a+b,0),mean:(arr)=>Math.round(arr.reduce((a,b)=>a+b,0)/arr.length),count:(arr)=>arr.length,max:(arr)=>Math.max(...arr),min:(arr)=>Math.min(...arr)};
    const fn=fns[agg];
    if(!fn) return`Unknown aggfunc: "${agg}"\nValid: sum, mean, count, max, min`;
    let o=`pivot_table(aggfunc='${agg}')\n\nName       Sales\n`;
    Object.entries(data).forEach(([n,vals])=>o+=`${n.padEnd(12)} ${fn(vals)}\n`);
    return o;
  },
  pvt_margins: (v) => {
    const m=v.margins.trim().toLowerCase()==="yes";
    const base=`pivot_table(index='Region', columns='Quarter',\n            values='Sales', aggfunc='sum'${m?", margins=True":""})\n\nQuarter     Q1      Q2${m?"    All":""}\nRegion\nNorth     25000   27000${m?"  52000":""}\nSouth     30000   32000${m?"  62000":""}\nEast      15000   18000${m?"  33000":""}`;
    return m?base+"\nAll       70000   77000  147000\n\nMargins = Grand Total row/col":base+"\n\nNo totals (margins=False)";
  },
  exp_explode: (v) => {
    const items=v.lists.split(",").map(s=>s.trim()).filter(Boolean);
    if(!items.length) return`Enter comma-separated values`;
    let o=`Original row:\n  Manager='Alice'\n  Direct_Reports=[${items.join(", ")}]\n\nAfter .explode():\n  Manager  Direct_Reports\n`;
    items.forEach((item,i)=>o+=`  Alice    ${item}  (index: 0)\n`);
    o+=`\n${items.length} rows -- all keep index=0\nCall .reset_index(drop=True) for 0,1,2...`;
    return o;
  },
  exp_stack: (v) => {
    const op=v.op.trim().toLowerCase();
    if(op==="stack") return`Wide DataFrame:\n       Q1      Q2\nNorth  25000   27000\nSouth  30000   32000\n\nAfter .stack():\nNorth  Q1    25000\n       Q2    27000\nSouth  Q1    30000\n       Q2    32000\n\nShape: (4,) MultiIndex Series\nColumns -> innermost index level`;
    if(op==="unstack") return`Stacked MultiIndex Series:\nNorth  Q1    25000\n       Q2    27000\nSouth  Q1    30000\n       Q2    32000\n\nAfter .unstack():\n       Q1      Q2\nNorth  25000   27000\nSouth  30000   32000\n\nInnermost index -> columns again`;
    return`Enter: stack or unstack`;
  },
  grp_inspect: (v) => {
    const col=v.col.trim();
    const data=[{Waiter:"Alice",Day:"Fri",Total_Bill:25.5,Tip:5.0},{Waiter:"Bob",Day:"Fri",Total_Bill:15.0,Tip:2.0},{Waiter:"Alice",Day:"Sat",Total_Bill:45.2,Tip:9.0},{Waiter:"Charlie",Day:"Sat",Total_Bill:30.1,Tip:6.0},{Waiter:"Bob",Day:"Sun",Total_Bill:18.5,Tip:3.5},{Waiter:"Alice",Day:"Sun",Total_Bill:12.0,Tip:2.0},{Waiter:"Charlie",Day:"Sun",Total_Bill:40.0,Tip:8.0}];
    const valid=["Waiter","Day","Meal_Time"];
    if(!valid.includes(col)) return`Valid columns: Waiter, Day, Meal_Time`;
    const groups={};
    data.forEach(r=>{(groups[r[col]]||(groups[r[col]]=[])).push(r);});
    let o=`groupby('${col}')\n${Object.keys(groups).length} groups:\n\n`;
    Object.entries(groups).forEach(([k,rows])=>{const avgBill=(rows.reduce((a,r)=>a+r.Total_Bill,0)/rows.length).toFixed(2);o+=`${k.padEnd(10)} ${rows.length} rows  avg_bill=$${avgBill}\n`;});
    return o;
  },
  grp_agg: (v) => {
    const agg=v.agg.trim().toLowerCase();
    const data={Alice:[25.5,45.2,12.0],Bob:[15.0,18.5],Charlie:[30.1,40.0]};
    const fns={sum:a=>a.reduce((x,y)=>x+y,0).toFixed(2),mean:a=>(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2),max:a=>Math.max(...a).toFixed(2),min:a=>Math.min(...a).toFixed(2),count:a=>a.length};
    const fn=fns[agg];
    if(!fn) return`Valid: sum, mean, max, min, count`;
    return`groupby('Waiter')['Total_Bill'].${agg}()\n\n${Object.entries(data).map(([n,v])=>`${n.padEnd(10)} ${fn(v)}`).join("\n")}`;
  },
  agg_multi: (v) => {
    const fn1=v.fn1.trim(),fn2=v.fn2.trim();
    const data={Alice:[25.5,45.2,12.0],Bob:[15.0,18.5],Charlie:[30.1,40.0]};
    const fns={sum:a=>a.reduce((x,y)=>x+y,0).toFixed(2),mean:a=>(a.reduce((x,y)=>x+y,0)/a.length).toFixed(2),max:a=>Math.max(...a).toFixed(2),min:a=>Math.min(...a).toFixed(2),count:a=>a.length,std:a=>{const m=a.reduce((x,y)=>x+y,0)/a.length;return Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/a.length).toFixed(2);}};
    const f1=fns[fn1],f2=fns[fn2];
    if(!f1||!f2) return`Valid: sum, mean, max, min, count, std`;
    return`agg({'Total_Bill':['${fn1}','${fn2}']})\n\nWaiter      ${fn1.padEnd(10)} ${fn2}\n${Object.entries(data).map(([n,v])=>`${n.padEnd(12)} ${f1(v).toString().padEnd(10)} ${f2(v)}`).join("\n")}\n\nNote: creates MultiIndex columns\nFlatten: df.columns = ['_'.join(c) for c in df.columns]`;
  },
  agg_named: (v) => {
    const n1=v.name1||"revenue",n2=v.name2||"avg_bill";
    const data={Alice:[25.5,45.2,12.0],Bob:[15.0,18.5],Charlie:[30.1,40.0]};
    return`agg(\n  ${n1}=('Total_Bill','sum'),\n  ${n2}=('Total_Bill','mean')\n)\n\nWaiter      ${n1.padEnd(12)} ${n2}\n${Object.entries(data).map(([n,v])=>{const s=v.reduce((a,b)=>a+b,0),m=(s/v.length).toFixed(2);return`${n.padEnd(12)} ${s.toFixed(2).padEnd(12)} ${m}`;}).join("\n")}`;
  },
  trf_pct: (v) => {
    const grp=v.grp.trim();
    const data=[{Waiter:"Alice",Day:"Fri",Total_Bill:25.5},{Waiter:"Bob",Day:"Fri",Total_Bill:15.0},{Waiter:"Alice",Day:"Sat",Total_Bill:45.2},{Waiter:"Charlie",Day:"Sat",Total_Bill:30.1},{Waiter:"Bob",Day:"Sun",Total_Bill:18.5},{Waiter:"Alice",Day:"Sun",Total_Bill:12.0},{Waiter:"Charlie",Day:"Sun",Total_Bill:40.0}];
    const valid=["Waiter","Day"];
    if(!valid.includes(grp)) return`Valid: Waiter, Day`;
    const totals={};
    data.forEach(r=>totals[r[grp]]=(totals[r[grp]]||0)+r.Total_Bill);
    let o=`transform('sum') grouped by '${grp}'\nthen: Pct = Bill / GroupTotal * 100\n\n${grp.padEnd(10)} Bill    GroupTotal  Pct%\n`;
    data.forEach(r=>o+=`${r[grp].padEnd(10)} ${r.Total_Bill.toFixed(1).padEnd(8)} ${totals[r[grp]].toFixed(1).padEnd(12)} ${(r.Total_Bill/totals[r[grp]]*100).toFixed(1)}%\n`);
    return o;
  },
  trf_filter: (v) => {
    const min=parseInt(v.min_orders)||2;
    const data=[{Waiter:"Alice",Day:"Fri",Total_Bill:25.5},{Waiter:"Bob",Day:"Fri",Total_Bill:15.0},{Waiter:"Alice",Day:"Sat",Total_Bill:45.2},{Waiter:"Charlie",Day:"Sat",Total_Bill:30.1},{Waiter:"Bob",Day:"Sun",Total_Bill:18.5},{Waiter:"Alice",Day:"Sun",Total_Bill:12.0},{Waiter:"Charlie",Day:"Sun",Total_Bill:40.0}];
    const counts={Alice:3,Bob:2,Charlie:2};
    const kept=Object.entries(counts).filter(([k,v])=>v>min).map(([k])=>k);
    let o=`filter(lambda x: len(x) > ${min})\n\nGroup sizes: Alice=3, Bob=2, Charlie=2\n\nGroups KEPT (>${min}): ${kept.join(", ")||"(none)"}\n\n`;
    if(kept.length) o+=data.filter(r=>kept.includes(r.Waiter)).map(r=>`  ${r.Waiter.padEnd(10)} ${r.Day}  $${r.Total_Bill}`).join("\n");
    else o+=`(no rows -- all groups dropped)`;
    return o;
  },
  bin_cut: (v) => {
    const nb=Math.max(2,Math.min(6,parseInt(v.nbins)||3));
    const bills=[25.5,15.0,45.2,30.1,18.5,12.0,40.0];
    const min=12,max=45.2,width=(max-min)/nb;
    const labels=Array.from({length:nb},(_,i)=>`Bin${i+1}`);
    const bins=bills.map(b=>{const idx=Math.min(Math.floor((b-min)/width),nb-1);return labels[idx];});
    const counts={};labels.forEach(l=>counts[l]=0);bins.forEach(b=>counts[b]++);
    let o=`pd.cut(Total_Bill, bins=${nb})\nWidth per bin: $${width.toFixed(2)}\n\nBill    -> Bin\n`;
    bills.forEach((b,i)=>o+=`$${b.toString().padEnd(6)} -> ${bins[i]}\n`);
    o+=`\nvalue_counts():\n${Object.entries(counts).map(([k,v])=>`  ${k}: ${v}`).join("\n")}`;
    return o;
  },
  bin_crosstab: (v) => {
    const norm=v.norm.trim().toLowerCase();
    const raw={"Dinner":{"Fri":1,"Sat":2,"Sun":2},"Lunch":{"Fri":1,"Sat":0,"Sun":1}};
    if(norm==="no"||norm==="false") return`crosstab(normalize=False):\nMeal    Fri  Sat  Sun  All\nDinner    1    2    2    5\nLunch     1    0    1    2\nAll       2    2    3    7`;
    if(norm==="index") return`normalize='index' (row %):\nMeal    Fri   Sat   Sun\nDinner  0.20  0.40  0.40\nLunch   0.50  0.00  0.50\n\nEach row sums to 1.0`;
    if(norm==="columns") return`normalize='columns' (col %):\nMeal    Fri   Sat   Sun\nDinner  0.50  1.00  0.67\nLunch   0.50  0.00  0.33\n\nEach column sums to 1.0`;
    if(norm==="all") return`normalize='all' (grand total %):\nMeal    Fri   Sat   Sun\nDinner  0.14  0.29  0.29\nLunch   0.14  0.00  0.14\n\nAll cells sum to 1.0`;
    return`normalize=?\nValid: no, index, columns, all`;
  },
  dt_parse: (v) => {
    const dt=v.dt.trim();
    try{const d=new Date(dt);if(isNaN(d))return`Cannot parse: "${dt}"`;const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];const dayIdx=(d.getDay()+6)%7;return`Input:      "${dt}"\n\nYear:       ${d.getFullYear()}\nMonth:      ${d.getMonth()+1}\nDay:        ${d.getDate()}\nHour:       ${d.getHours()}\nMinute:     ${d.getMinutes()}\nDayOfWeek:  ${dayIdx} (${days[dayIdx]})\nQuarter:    ${Math.ceil((d.getMonth()+1)/3)}\n\nPandas dtype: datetime64[ns]`;}catch(e){return`Cannot parse: "${dt}"`;}
  },
  dt_component: (v) => {
    const comp=v.comp.trim().toLowerCase();
    const dates=["2023-10-25 09:30:00","2023-10-25 10:30:00","2023-10-26 09:30:00","2023-10-26 10:30:00","2023-10-27 16:00:00"];
    const fns={year:d=>d.getFullYear(),month:d=>d.getMonth()+1,day:d=>d.getDate(),hour:d=>d.getHours(),minute:d=>d.getMinutes(),dayofweek:d=>(d.getDay()+6)%7,quarter:d=>Math.ceil((d.getMonth()+1)/3)};
    const fn=fns[comp];
    if(!fn) return`Valid: year, month, day, hour, minute, dayofweek, quarter`;
    let o=`Component: ${comp}\n\nDate                 -> ${comp}\n${"-".repeat(35)}\n`;
    dates.forEach(d=>{const parsed=new Date(d);o+=`${d}  ->  ${fn(parsed)}\n`;});
    return o;
  },
  tsl_slice: (v) => {
    const s=v.dstr.trim();
    const dates=["2023-10-25 09:30:00","2023-10-25 10:30:00","2023-10-26 09:30:00","2023-10-26 10:30:00","2023-10-27 16:00:00"];
    const prices=[150.50,151.25,149.80,152.00,155.10];
    const matched=dates.filter(d=>d.startsWith(s));
    if(!matched.length) return`No rows match "${s}"\nTry: 2023-10-25, 2023-10-26, 2023-10-27, or 2023-10-25 09:30`;
    let o=`df['${s}']\n\n${matched.length} rows matched:\n`;
    matched.forEach((d,i)=>{const origIdx=dates.indexOf(d);o+=`  ${d}  $${prices[origIdx]}\n`;});
    return o;
  },
  tsl_hour: (v) => {
    const h=parseInt(v.hour)||9;
    const data=[{dt:"2023-10-25 09:30:00",hour:9,price:150.50},{dt:"2023-10-25 10:30:00",hour:10,price:151.25},{dt:"2023-10-26 09:30:00",hour:9,price:149.80},{dt:"2023-10-26 10:30:00",hour:10,price:152.00},{dt:"2023-10-27 16:00:00",hour:16,price:155.10}];
    const matched=data.filter(r=>r.hour===h);
    if(!matched.length) return`No trades at hour ${h}`;
    let o=`df[df.index.hour == ${h}]\n\n${matched.length} trades at ${h}:00:\n`;
    matched.forEach(r=>o+=`  ${r.dt}  $${r.price}\n`);
    return o;
  },
  res_freq: (v) => {
    const freq=v.freq.trim().toLowerCase();
    const agg=v.aggfn.trim().toLowerCase();
    if(freq==="d") return`resample('D').${agg}()\n\nDate         ${agg==="mean"?"Price":agg==="sum"?"Volume":agg}\n2023-10-25   ${agg==="mean"?"150.88":agg==="sum"?"2200":agg==="max"?"151.25":"2"}\n2023-10-26   ${agg==="mean"?"150.90":agg==="sum"?"2400":agg==="max"?"152.00":"2"}\n2023-10-27   ${agg==="mean"?"155.10":agg==="sum"?"2000":agg==="max"?"155.10":"1"}\n\n3 rows (downsampled from 5)`;
    if(freq==="h") return`resample('h').${agg}()\n\nUpsampling: creates 48+ hourly rows (many NaN)\nOriginal: 5 rows → hourly: ~70 rows\nUse ffill() to fill gaps`;
    return`resample('${freq}').${agg}()\n\nValid frequencies:\n- 'D' daily\n- 'h' hourly\n- 'W' weekly\n- 'ME' month end\n- 'YE' year end`;
  },
  res_fill: (v) => {
    const fill=v.fill.trim().toLowerCase();
    if(fill==="ffill") return`Upsampled to hourly with ffill():\n\n2023-10-25 09:30:00  150.50\n2023-10-25 10:30:00  151.25\n2023-10-25 11:30:00  151.25  ← carried forward\n2023-10-25 12:30:00  151.25  ← carried forward\n2023-10-25 13:30:00  151.25\n...\n2023-10-26 09:30:00  149.80\n\nAll NaN filled with last known price`;
    if(fill==="bfill") return`Upsampled to hourly with bfill():\n\n2023-10-25 09:30:00  150.50\n2023-10-25 10:30:00  151.25\n2023-10-25 11:30:00  149.80  ← next known price\n2023-10-25 12:30:00  149.80\n2023-10-25 13:30:00  149.80\n...\n\nNaN filled with next known price`;
    if(fill==="none") return`Upsampled to hourly (no fill):\n\n2023-10-25 09:30:00  150.50\n2023-10-25 10:30:00  151.25\n2023-10-25 11:30:00  NaN  ← no data\n2023-10-25 12:30:00  NaN\n...\n\nMany missing values — not analysis-ready`;
    return`Fill strategy: ${fill}\nValid: ffill, bfill, none`;
  },
  rol_shift: (v) => {
    const n=parseInt(v.n)||1;
    const prices=[150.50,151.25,149.80,152.00,155.10];
    const shifted=n>=0?[..."NaN".repeat(Math.min(n,prices.length)).split(""),...prices.slice(0,-n)]:[...prices.slice(-n),..."NaN".repeat(Math.min(-n,prices.length)).split("")];
    const dates=["Oct25 09:30","Oct25 10:30","Oct26 09:30","Oct26 10:30","Oct27 16:00"];
    let o=`shift(${n}) (${n>=0?"look back":"look forward"}):\n\nDate            Price   Shifted\n${"-".repeat(40)}\n`;
    for(let i=0;i<prices.length;i++) o+=`${dates[i].padEnd(14)} ${prices[i]}   ${shifted[i]}\n`;
    return o;
  },
  rol_window: (v) => {
    const w=Math.max(2,Math.min(5,parseInt(v.w)||2));
    const prices=[150.50,151.25,149.80,152.00,155.10];
    const ma=prices.map((_,i)=>{if(i<w-1) return "NaN";const win=prices.slice(i-w+1,i+1);return (win.reduce((a,b)=>a+b,0)/w).toFixed(2);});
    const dates=["Oct25 09:30","Oct25 10:30","Oct26 09:30","Oct26 10:30","Oct27 16:00"];
    let o=`rolling(${w}).mean():\n\nDate            Price   MA${w}\n${"-".repeat(40)}\n`;
    for(let i=0;i<prices.length;i++) o+=`${dates[i].padEnd(14)} ${prices[i]}   ${ma[i]}\n`;
    return o;
  },
  viz_kind: (v) => {
    const kind=v.kind.trim().toLowerCase();
    const valid=["line","bar","hist","scatter"];
    if(!valid.includes(kind)) return`Unknown kind: ${kind}\nValid: line, bar, hist, scatter`;
    let code="";
    if(kind==="line") code=`df['Price'].plot.line(title='Stock Price', xlabel='Date', ylabel='Price')\nplt.show()`;
    if(kind==="bar") code=`df['Volume'].plot.bar(title='Daily Volume', xlabel='Date', ylabel='Volume')\nplt.show()`;
    if(kind==="hist") code=`df['Price'].plot.hist(bins=10, title='Price Distribution')\nplt.show()`;
    if(kind==="scatter") code=`df.plot.scatter(x='Price', y='Volume', title='Price vs Volume')\nplt.show()`;
    return`Plot type: ${kind}\n\n${code}`;
  },
  viz_bins: (v) => {
    const bins=parseInt(v.bins)||5;
    if(isNaN(bins)||bins<2) return`Enter a number of bins (>=2)`;
    return`df['Price'].plot.hist(bins=${bins}, title='Price Distribution', xlabel='Price ($)', ylabel='Frequency')\nplt.show()\n\nHistogram with ${bins} equally-spaced bins across price range.`;
  }
};

// ==========================================
// COMPONENTS
// ==========================================
function TheoryBlock({ block }) {
  return (
    <div className="theory-block">
      <h3>{block.title}</h3>
      {block.content && (
        <p dangerouslySetInnerHTML={{ __html: block.content.replace(/`([^`]+)`/g,"<code>$1</code>") }} />
      )}
      {block.points && (
        <ul style={{marginTop:8}}>
          {block.points.map((p,i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: p.replace(/`([^`]+)`/g,"<code>$1</code>") }} />
          ))}
        </ul>
      )}
      {block.useCases && (
        <div className="use-case-grid">
          {block.useCases.map((uc,i) => (
            <div key={i} className="use-case-card">
              <div className="uc-title">{uc.icon} {uc.title}</div>
              <div className="uc-body">{uc.body}</div>
            </div>
          ))}
        </div>
      )}
      {block.analogy && <div className="analogy">{block.analogy}</div>}
    </div>
  );
}

function QuizQuestion({ q, opts, correct, explain, qNum, onCorrect }) {
  const [sel, setSel] = useState(null);
  function pick(i) {
    if (sel !== null) return;
    setSel(i);
    if (i === correct) onCorrect();
  }
  return (
    <div className="challenge-card">
      <div className="challenge-num">Question {qNum}</div>
      <div className="challenge-q" dangerouslySetInnerHTML={{ __html: q.replace(/\n/g,"<br/>").replace(/`([^`]+)`/g,"<code>$1</code>") }} />
      <div className="options">
        {opts.map((o,i) => {
          let cls = "opt";
          if (sel !== null) {
            if (i === correct) cls += " correct";
            else if (i === sel) cls += " wrong";
          }
          return <button key={i} className={cls} onClick={() => pick(i)}>{o}</button>;
        })}
      </div>
      {sel !== null && (
        <div className={`feedback ${sel === correct ? "fb-correct" : "fb-wrong"}`}>
          <strong>{sel === correct ? "Correct!" : "Not quite"}</strong> — {explain}
          {sel === correct && <div className="xp-badge">+10 XP earned!</div>}
        </div>
      )}
    </div>
  );
}

function OpenChallenge({ oc, num }) {
  const [show, setShow] = useState(false);
  return (
    <div className="open-challenge">
      <div className="oc-badge">Open Challenge {num}</div>
      <div className="oc-q" dangerouslySetInnerHTML={{ __html: oc.q.replace(/`([^`]+)`/g,"<code>$1</code>") }} />
      <div className="oc-hint">Hint: {oc.hint}</div>
      <button className="reveal-btn" onClick={() => setShow(s => !s)}>
        {show ? "Hide solution" : "Reveal solution"}
      </button>
      {show && <div className="solution-box">{oc.solution}</div>}
    </div>
  );
}

function Experiment({ exp }) {
  const [vals, setVals] = useState(() => Object.fromEntries(exp.inputs.map(i => [i.id, i.val])));
  const [result, setResult] = useState("");
  const runner = RUNNERS[exp.runId];
  return (
    <div className="exp-card">
      <div className="exp-title">{exp.title}</div>
      <div className="exp-desc">{exp.desc}</div>
      {exp.inputs.map(inp => (
        <div key={inp.id} className="exp-row">
          <span className="exp-lbl">{inp.label}</span>
          <input className="exp-inp" type={inp.type} style={{width:inp.w}} value={vals[inp.id]}
            onChange={e => setVals(v => ({...v, [inp.id]: e.target.value}))} />
        </div>
      ))}
      <button className="exp-run" onClick={() => runner && setResult(runner(vals))}>
        Run experiment
      </button>
      {result && <div className="exp-result">{result}</div>}
    </div>
  );
}

function MistakeCard({ m }) {
  return (
    <div className="mistake-card">
      <div className="mc-title">Warning: {m.title}</div>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.8px",textTransform:"uppercase",color:"#f87171",marginBottom:5}}>Wrong</div>
      <div className="wrong-blk">{m.wrong}</div>
      <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.8px",textTransform:"uppercase",color:"#34d399",margin:"10px 0 5px"}}>Fix</div>
      <div className="fix-blk">{m.fix}</div>
      <div className="mc-why" dangerouslySetInnerHTML={{ __html: m.why }} />
    </div>
  );
}

function PurePythonTab({ lesson }) {
  if (!lesson.purePython) {
    return (
      <div className="pp-wrap">
        <div className="pp-banner">
          <div className="pp-banner-title">Pure Python vs Pandas</div>
          <div className="pp-banner-sub">Pure Python comparisons are shown in Chapter 2+ lessons where I/O and data manipulation make the contrast most vivid.</div>
        </div>
      </div>
    );
  }
  const pp = lesson.purePython;
  return (
    <div className="pp-wrap">
      <div className="pp-banner">
        <div className="pp-banner-title">Pure Python vs Pandas</div>
        <div className="pp-banner-sub">{pp.title} — See exactly what Pandas replaces. Build intuition for why Pandas exists.</div>
      </div>
      {pp.comparisons.map((cmp,i) => (
        <div key={i} style={{marginBottom:24}}>
          <div className="pp-section-title">Task {i+1}: {cmp.task}</div>
          <div className="pp-lines-saved">{cmp.saved}</div>
          <div className="pp-compare">
            <div className="pp-col">
              <div className="pp-col-head python">Pure Python</div>
              <div className="pp-code">{cmp.pyCode}</div>
            </div>
            <div className="pp-col">
              <div className="pp-col-head pandas">With Pandas</div>
              <div className="pp-code">{cmp.pdCode}</div>
            </div>
          </div>
          <div className="pp-verdict"><strong>Verdict: </strong>{cmp.verdict}</div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// SIMULATED RUN OUTPUTS
// ==========================================
function RunOutput({ lesson }) {
  const id = lesson.id;
  // Generic datasets for various outputs
  const empRows = [
    {id:101,n:"Alice",d:"Engineering",s:120000,y:5},
    {id:102,n:"Bob",d:"HR",s:75000,y:3},
    {id:103,n:"Charlie",d:"Engineering",s:110000,y:4},
    {id:104,n:"David",d:"Sales",s:90000,y:2},
    {id:105,n:"Eve",d:"Engineering",s:130000,y:8},
    {id:106,n:"Frank",d:"Sales",s:95000,y:3},
  ];
  const custRows = [
    {id:"101",n:"Jane Doe",a:28,ph:"555-1234",amt:"$150.50"},
    {id:"102",n:"john smith",a:-999,ph:"555-5678",amt:"$200.00"},
    {id:"104",n:"Alice Jones",a:35,ph:"NaN",amt:"$45.00"},
    {id:"105",n:"Bob_Brown",a:null,ph:"555-9999",amt:"Free"},
    {id:"106",n:"Charlie",a:42,ph:"555-0000",amt:"$120.75"}
  ];
  const stockRows = [
    {dt:"2023-10-25 09:30:00",p:150.50,v:1000},
    {dt:"2023-10-25 10:30:00",p:151.25,v:1200},
    {dt:"2023-10-26 09:30:00",p:149.80,v:900},
    {dt:"2023-10-26 10:30:00",p:152.00,v:1500},
    {dt:"2023-10-27 16:00:00",p:155.10,v:2000}
  ];
  const tips = [
    {w:"Alice",day:"Fri",mt:"Dinner",bill:25.5,tip:5.0},
    {w:"Bob",day:"Fri",mt:"Lunch",bill:15.0,tip:2.0},
    {w:"Alice",day:"Sat",mt:"Dinner",bill:45.2,tip:9.0},
    {w:"Charlie",day:"Sat",mt:"Dinner",bill:30.1,tip:6.0},
    {w:"Bob",day:"Sun",mt:"Dinner",bill:18.5,tip:3.5},
    {w:"Alice",day:"Sun",mt:"Lunch",bill:12.0,tip:2.0},
    {w:"Charlie",day:"Sun",mt:"Dinner",bill:40.0,tip:8.0}
  ];

  if (id === "intro") return (
    <div>
      <div className="out-label">Pandas version</div>
      <div className="out-txt">Pandas version: 2.1.4</div>
      <div className="out-label">Series (1D)</div>
      <div className="series-box">
        {[10,20,30,40].map((v,i) => <div key={i} className="sr"><span className="si">{i}</span><span className="sv">{v}</span></div>)}
        <div className="smeta">dtype: int64</div>
      </div>
      <div className="out-label">DataFrame (2D)</div>
      <div className="df-tbl-wrap"><table className="df-tbl">
        <thead><tr><th></th><th>name</th><th>score</th></tr></thead>
        <tbody>{[["Alice",95],["Bob",87],["Carol",92]].map(([n,s],i) =>
          <tr key={i}><td className="idx-cell">{i}</td><td>{n}</td><td style={{color:"#fbbf24"}}>{s}</td></tr>
        )}
        </tbody>
      </table></div>
    </div>
  );
  if (id === "series") return (
    <div>
      <div className="out-label">From list</div>
      <div className="series-box">
        {[34,18,42,66].map((v,i) => <div key={i} className="sr"><span className="si">{i}</span><span className="sv">{v}</span></div>)}
        <div className="smeta">Name: Age, dtype: int64</div>
      </div>
      <div className="out-label">From dict</div>
      <div className="series-box">
        {Object.entries({Alice:95,Bob:87,Carol:92}).map(([k,v]) =>
          <div key={k} className="sr"><span className="si" style={{minWidth:52,color:"#9d98c0"}}>{k}</span><span className="sv">{v}</span></div>)}
        <div className="smeta">Name: Score, dtype: int64</div>
      </div>
    </div>
  );
  if (id === "dataframe") return (
    <div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th></th><th>first_name</th><th>last_name</th><th>email</th><th>age</th></tr></thead><tbody>
      {[["Jane","Doe","jane@email.com",34],["John","Smith","john@email.com",18],["Corey","Schafer","corey@email.com",42],["Marie","Curie","marie@email.com",66]].map(([f,l,e,a],i)=>
        <tr key={i}><td className="idx-cell">{i}</td><td>{f}</td><td>{l}</td><td>{e}</td><td style={{color:"#fbbf24"}}>{a}</td></tr>)}
    </tbody></table></div></div>
  );
  if (id === "index") return (
    <div><div className="out-label">After set_index</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th>email</th><th>first_name</th><th>last_name</th><th>age</th></tr></thead><tbody>
      {[["jane@email.com","Jane","Doe",34],["john@email.com","John","Smith",18],["corey@email.com","Corey","Schafer",42],["marie@email.com","Marie","Curie",66]].map(([e,f,l,a])=>
        <tr key={e}><td className="idx-cell">{e}</td><td>{f}</td><td>{l}</td><td style={{color:"#fbbf24"}}>{a}</td></tr>)}
    </tbody></table></div></div>
  );
  if (id === "multiindex") return (
    <div><div className="out-label">MultiIndex DataFrame</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th>last_name</th><th>first_name</th><th>email</th><th>age</th></tr></thead><tbody>
      {[["Doe","Jane","jane@email.com",34],["Smith","John","john@email.com",18],["Schafer","Corey","corey@email.com",42],["Curie","Marie","marie@email.com",66]].map(([l,f,e,a])=>
        <tr key={l+f}><td className="idx-cell">{l}</td><td className="idx-cell">{f}</td><td>{e}</td><td style={{color:"#fbbf24"}}>{a}</td></tr>)}
    </tbody></table></div></div>
  );
  if (id === "inspection") return (
    <div><div className="out-label">Employee DataFrame</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th>Emp_ID</th><th>Name</th><th>Department</th><th>Salary</th><th>Years_Exp</th></tr></thead><tbody>
      {empRows.map(r => <tr key={r.id}><td className="idx-cell">{r.id}</td><td>{r.n}</td><td>{r.d}</td><td style={{color:"#34d399"}}>{r.s}</td><td style={{color:"#fbbf24"}}>{r.y}</td></tr>)}
    </tbody></table></div><div className="out-txt">Press Run to see output</div></div>
  );
  if (["duplicates","string_cleaning","missing_values","type_conversion"].includes(id)) return (
    <div><div className="out-label">Customer Dataset (before cleaning)</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th></th><th>CustomerID</th><th>Name</th><th>Age</th><th>Phone</th><th>Purchase_Amt</th></tr></thead><tbody>
      {custRows.map((r,i)=><tr key={i}><td className="idx-cell">{i}</td><td>{r.id}</td><td>{r.n}</td><td style={{color:r.a===-999?"#f87171":r.a===null?"#9d98c0":"#fbbf24"}}>{r.a===null?"NaN":r.a}</td><td style={{color:r.ph==="NaN"?"#9d98c0":"inherit"}}>{r.ph}</td><td style={{color:r.amt==="Free"?"#f87171":"#34d399"}}>{r.amt}</td></tr>)}
    </tbody></table></div><div className="out-txt">Press Run to see cleaning output</div></div>
  );
  if (["concat","merge","melt","pivot","explode_stack"].includes(id)) return (
    <div><div className="out-label">sales_q1 / sales_q2 / regions</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th></th><th>Rep_ID</th><th>Name</th><th>Sales</th></tr></thead><tbody>
      {[{id:101,n:"Alice",s:25000},{id:102,n:"Bob",s:30000},{id:103,n:"Charlie",s:15000}].map((r,i)=><tr key={i}><td className="idx-cell">{i}</td><td>{r.id}</td><td>{r.n}</td><td style={{color:"#34d399"}}>{r.s}</td></tr>)}
    </tbody></table></div><div className="out-txt">Press Run to see combined output</div></div>
  );
  if (["groupby_basics","agg","transform_filter","binning_crosstab"].includes(id)) return (
    <div><div className="out-label">Restaurant Tips Dataset</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th></th><th>Waiter</th><th>Day</th><th>Meal_Time</th><th>Total_Bill</th><th>Tip</th></tr></thead><tbody>
      {tips.map((r,i)=><tr key={i}><td className="idx-cell">{i}</td><td>{r.w}</td><td>{r.day}</td><td>{r.mt}</td><td style={{color:"#34d399"}}>${r.bill}</td><td style={{color:"#fbbf24"}}>${r.tip}</td></tr>)}
    </tbody></table></div><div className="out-txt">Press Run to see grouped output</div></div>
  );
  if (["datetime_basics","temporal_slicing","resample","shift_rolling"].includes(id)) return (
    <div><div className="out-label">Stock Trades Dataset</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th>Date</th><th>Price</th><th>Volume</th></tr></thead><tbody>
      {stockRows.map((r,i)=><tr key={i}><td className="idx-cell">{r.dt}</td><td style={{color:"#34d399"}}>${r.p}</td><td style={{color:"#fbbf24"}}>{r.v}</td></tr>)}
    </tbody></table></div><div className="out-txt">Press Run to see time series output</div></div>
  );
  if (id === "viz_intro") return (
    <div><div className="out-label">Stock DataFrame for Plotting</div><div className="df-tbl-wrap"><table className="df-tbl"><thead><tr><th>Date</th><th>Price</th><th>Volume</th></tr></thead><tbody>
      {[["2023-10-25",150.50,1000],["2023-10-26",151.25,1200],["2023-10-27",149.80,900]].map(([d,p,v])=><tr key={d}><td className="idx-cell">{d}</td><td style={{color:"#34d399"}}>${p}</td><td style={{color:"#fbbf24"}}>{v}</td></tr>)}
    </tbody></table></div><div className="out-txt">Press Run to see plotting code</div></div>
  );
  return <div><div className="out-txt">Press Run to see output</div></div>;
}

// ==========================================
// TABS
// ==========================================
const TABS = [
  {id:"theory",    label:"Theory"},
  {id:"code",      label:"Code"},
  {id:"quiz",      label:"Quiz"},
  {id:"challenges",label:"Challenges"},
  {id:"experiments",label:"Experiments"},
  {id:"mistakes",  label:"Debug"},
  {id:"purepython",label:"Pure Python"},
];

// ==========================================
// MAIN APP
// ==========================================
export default function PandasPlayground() {
  const [currentId, setCurrentId] = useState("intro");
  const [activeTab, setActiveTab] = useState("theory");
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const [codeOutput, setCodeOutput] = useState(null);
  const [quizScores, setQuizScores] = useState({});
  const [activeChapter, setActiveChapter] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toastRef = useRef(null);

  const lesson = CURRICULUM.find(c => c.id === currentId);
  const totalXp = CURRICULUM.reduce((a,c) => a + c.xpReward, 0);
  const pct = Math.min(100, Math.round((xp / totalXp) * 100));

  const ch1 = byChapter(1);
  const ch2 = byChapter(2);
  const ch3 = byChapter(3);
  const ch4 = byChapter(4);
  const ch5 = byChapter(5);
  const ch6 = byChapter(6);
  const ch7 = byChapter(7);
  const ch8 = byChapter(8);

  function groupBy(lessons) {
    return lessons.reduce((acc, l) => {
      const st = l.subtopic || "Other";
      if (!acc[st]) acc[st] = [];
      acc[st].push(l);
      return acc;
    }, {});
  }

  function showToast(msg) {
    setToastMsg(msg); setToastShow(true);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToastShow(false), 2000);
  }

  function addXp(amt) { setXp(x => x+amt); showToast(`+${amt} XP!`); }

  function onQuizCorrect(lessonId, qi) {
    const key = `${lessonId}-${qi}`;
    if (!quizScores[key]) {
      setQuizScores(q => ({...q, [key]:true}));
      addXp(10); setStreak(s => s+1);
    }
  }

  function navigate(id, ch) {
    setCurrentId(id); setActiveTab("theory"); setCodeOutput(null);
    if (ch) setActiveChapter(ch);
    setSidebarOpen(false);
  }

  function runCode() {
    setCodeOutput(<RunOutput lesson={lesson} />);
    if (!completedLessons.has(currentId)) {
      setCompletedLessons(s => new Set([...s, currentId]));
      addXp(Math.floor(lesson.xpReward / 2));
    }
  }

  const chLabel = lesson?.chapter === 8 ? "Chapter 8 — Visualisation"
    : lesson?.chapter === 7 ? "Chapter 7 — Time Series & DateTime"
    : lesson?.chapter === 6 ? "Chapter 6 — GroupBy & Aggregation"
    : lesson?.chapter === 5 ? "Chapter 5 — Combining & Reshaping"
    : lesson?.chapter === 4 ? "Chapter 4 — Data Cleaning"
    : lesson?.chapter === 3 ? "Chapter 3 — Inspection & Filtering"
    : lesson?.chapter === 2 ? "Chapter 2 — Data I/O"
    : "Chapter 1 — Foundations";

  const renderSidebarGroup = (lessons, ch) => {
    const groups = ch > 1 ? groupBy(lessons) : {"All": lessons};
    return Object.entries(groups).map(([subtopic, items]) => (
      <div key={subtopic}>
        {ch > 1 && <div className="sidebar-section" style={{paddingTop:10}}>{subtopic}</div>}
        {items.map(c => (
          <div key={c.id}
            className={`lesson-item ${c.id===currentId?"active":""} ${completedLessons.has(c.id)?"done":""}`}
            onClick={() => navigate(c.id, ch)}>
            <span className="l-icon">{completedLessons.has(c.id) ? "✓" : c.icon}</span>
            <span style={{flex:1,fontSize:12}}>{c.title}</span>
            <span className="l-xp">+{c.xpReward}</span>
          </div>
        ))}
      </div>
    ));
  };

  const sidebarChapters = [1,2,3,4,5,6,7,8];
  const chTitles = {
    1:"Ch1 — Foundations",
    2:"Ch2 — Data I/O",
    3:"Ch3 — Inspection",
    4:"Ch4 — Cleaning",
    5:"Ch5 — Combining",
    6:"Ch6 — GroupBy",
    7:"Ch7 — Time Series",
    8:"Ch8 — Visualisation"
  };

  return (
    <div className="app">
      <div className="header">
        <button className="menu-btn" onClick={() => setSidebarOpen(o => !o)}>☰</button>
        <div className="header-logo">Pandas Playground</div>
        <div className="chapter-pill">{chLabel}</div>
        <div className="streak">🔥 {streak}</div>
        <div className="xp-bar-wrap">
          <span className="xp-label">XP</span>
          <div className="xp-track"><div className="xp-fill" style={{width:`${pct}%`}} /></div>
          <span className="xp-num">{xp} / {totalXp}</span>
        </div>
      </div>

      <div className="body-area">
        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
        <nav className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
          {sidebarChapters.map((ch, i) => (
            <div key={ch}>
              {i > 0 && <div className="sidebar-divider"/>}
              <div className={`chapter-nav-btn ${activeChapter===ch?"ch-active":""}`} onClick={() => setActiveChapter(ch)}>
                &gt; {chTitles[ch]}
              </div>
              {activeChapter===ch && renderSidebarGroup(byChapter(ch), ch)}
            </div>
          ))}
        </nav>

        <div className="content">
          <div className="lesson-header">
            <div className="lesson-title-row">
              <div className="lesson-icon-big">{lesson.icon}</div>
              <div className="lesson-meta">
                <div className="lesson-h1">{lesson.title}</div>
                <div className="lesson-desc">
                  {lesson.subtopic && <span style={{color:"#fbbf24",marginRight:8}}>{lesson.subtopic} &middot;</span>}
                  {lesson.desc} &middot; <span style={{color:"#fbbf24",fontWeight:600}}>+{lesson.xpReward} XP</span>
                </div>
              </div>
            </div>
            <div className="mode-tabs">
              {TABS.map(t => (
                <div key={t.id} className={`m-tab ${activeTab===t.id?"active":""}`} onClick={() => setActiveTab(t.id)}>
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          {activeTab === "theory" && (
            <div className="tab-body">
              {lesson.subtopic && <div className="subtopic-badge">{lesson.subtopic}</div>}
              {lesson.theory.map((block,i) => <TheoryBlock key={i} block={block} />)}
              <div style={{textAlign:"center",paddingBottom:24,paddingTop:8}}>
                <button className="next-btn" onClick={() => setActiveTab("code")}>Try the code</button>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="code-panel">
              <div className="split">
                <div className="code-side">
                  <div className="panel-bar">
                    <span className="panel-bar-label">Python Editor</span>
                    <button className="run-btn" onClick={runCode}>Run</button>
                  </div>
                  <textarea className="code-ed" key={lesson.id} defaultValue={lesson.code} style={{flex:1}} />
                </div>
                <div className="out-side">
                  <div className="panel-bar">
                    <span className="panel-bar-label">Output</span>
                    <span style={{fontSize:11,color:codeOutput?"#34d399":"#5c577a"}}>{codeOutput?"success":"press Run"}</span>
                  </div>
                  <div className="out-area">
                    {codeOutput || <span style={{color:"#5c577a",fontFamily:"Fira Code,monospace",fontSize:12}}>// output appears here</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="challenge-wrap">
              <div className="info-bar">Answer correctly to earn +10 XP per question. These test real understanding.</div>
              {lesson.quiz.map((q,i) => (
                <QuizQuestion key={`${lesson.id}-${i}`} {...q} qNum={i+1} onCorrect={() => onQuizCorrect(currentId,i)} />
              ))}
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="challenge-wrap">
              <div className="info-bar">Write and run these in Jupyter, VS Code, or Colab. Try before revealing the solution!</div>
              {lesson.openChallenges.map((oc,i) => <OpenChallenge key={i} oc={oc} num={i+1} />)}
            </div>
          )}

          {activeTab === "experiments" && (
            <div className="challenge-wrap">
              <div className="info-bar">Tweak inputs and watch Pandas behaviour change in real time.</div>
              {lesson.experiments.map((exp,i) => <Experiment key={i} exp={exp} />)}
            </div>
          )}

          {activeTab === "mistakes" && (
            <div className="challenge-wrap">
              <div className="info-bar">The most common mistakes on this topic — with the bug, the fix, and why it happens.</div>
              {lesson.mistakes.map((m,i) => <MistakeCard key={i} m={m} />)}
            </div>
          )}

          {activeTab === "purepython" && <PurePythonTab lesson={lesson} />}
        </div>
      </div>

      <div className={`xp-toast ${toastShow?"show":""}`}>{toastMsg}</div>
    </div>
  );
}
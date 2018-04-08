# PyFiClient example
This is a simple example of PyFiClient and PyFi in action.

# Getting Started

As you'll see in the [PyFi installation instructions](https://github.com/IDEO-coLAB/pyfi#installation), you'll need to first create a Python environment to work in. If you already have that set up, you can skip this step. If not, you'll want to create an environment to work in.

Here's how you might do it with [virtualenv](https://virtualenv.pypa.io/en/stable/):
```bash
# Assuming you're using python 3
virtualenv -p python3 venv
source venv/bin/activate
```

And now you're ready to install this repo:
```bash
npm install
```

Now you can build the frontend:
```bash
webpack
```

And finally start the server:
```bash
node index.js
```

Your server should now be running on `localhost:3000`. Play around and have fun!

If something goes wrong in this process, feel free to open an issue. Please provide as much information as possible – which versions of Node and Python you're using, which OS, which browser, and anything else that might be relevant. 

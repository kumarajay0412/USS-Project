import React from 'react';

class ErrorBoundary extends React.Component {
  // eslint-disable-next-line react/sort-comp -- this is a valid use case for this rule othewrise component does not unount and only url changes
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line class-methods-use-this
  handleClick = () => {
    window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="bg-indigo-500 error-bg flex min-h-screen items-center  justify-center bg-cover bg-fixed bg-bottom">
          <div className="bg-red-500 text-white flex  items-center justify-center text-center">
            <div className="p-10 flex flex-col items-center">
              <img
                className="rounded-lg"
                // eslint-disable-next-line react/jsx-curly-brace-presence -- this is a valid use case for curly braces
                src={
                  'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
                }
                alt="dog"
              />
              <h1 className="app-font my-2 text-2xl font-bold text-gan-gray">
                Woops! <br /> Something went wrong :(
              </h1>
              <button onClick={this.handleClick}>Go Back</button>
            </div>
          </div>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;

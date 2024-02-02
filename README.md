# AWSome Kanban Board

Welcome to the repository of our web application, a Kanban board built on Amazon Web Services (AWS). This README will guide you through the process of setting up and installing this application.

This project is a collaborative effort by a team of three developers. You can check out their individual GitHub profiles via the links provided below:

- [Miłosz](https://github.com/hozakowskimilosz)
- [Julian](https://github.com/RybazPolski)
- [Piotrek](https://github.com/ArrogantPeter)

You can also check out a live demo of the application [here](https://awsomekanban.cognifidecloud.net/).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have an AWS account with necessary permissions.
- You have installed Node.js.
- You have installed npm (comes with Node.js).
- You have installed Git.

## Installation

Follow these steps to get your development environment set up:

1. Clone the repository:
    ```
    git clone https://github.com/zsl-hub/kanban-board-team-aws.git
    ```

2. Navigate to the project directory:
    ```
    cd kanban-board-team-aws
    ```

3. Install the required dependencies:
    ```
    npm install
    ```

4. Set up your AWS credentials by configuring your AWS Access Key and Secret Access Key. Make sure to replace `YOUR_ACCESS_KEY` and `YOUR_SECRET_KEY` with your actual AWS keys.
    ```
    aws configure
    AWS Access Key ID [None]: YOUR_ACCESS_KEY
    AWS Secret Access Key [None]: YOUR_SECRET_KEY
    Default region name [None]: us-west-2
    Default output format [None]: json
    ```

5. Deploy the application using AWS CLI.
    ```
    aws s3 sync . s3://your-bucket-name
    ```

6. The application is now deployed on AWS. You can access it via the S3 bucket URL.

## Usage

After installation, you can use the Kanban Board WebApp to manage and organize your tasks. Simply add new tasks, move them between different statuses (To Do, In Progress, Done), edit or delete them as needed.

## Contributing

If you want to contribute to this project, please fork this repository, make your changes, and create a pull request. Contributions are always welcome!

## License

This project uses the following license: [MIT License](https://opensource.org/licenses/MIT).

For any additional questions or comments, please open an issue in this repository.

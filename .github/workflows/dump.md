name: CI - CD @App-UI
on:
  push:
    branches:
      - DevOps
  pull_request:
    branches: 
      - DevOps
  schedule:
  - cron: '* * * * *'
jobs:
  build:
    runs-on: ubuntu-latest
    env: 
      MODULE_NAME: app-ui
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v2
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v1 
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1

      - name: Login to ECR
        id: ecr
        uses: jwalton/gh-ecr-login@v1
        with:
          access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID_R }}
          secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY_R }}
          region: ap-south-1
      - name: Build and Push to ECR
        run: |
         docker build -t ${{ env.MODULE_NAME }} . 
         docker tag ${{ env.MODULE_NAME }}  ${{ steps.ecr.outputs.account }}.dkr.ecr.ap-south-1.amazonaws.com/${{ env.MODULE_NAME }}:latest  
         docker push ${{ steps.ecr.outputs.account }}.dkr.ecr.ap-south-1.amazonaws.com/${{ env.MODULE_NAME }}:latest

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID_R }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY_R }}
          aws-region: ap-south-1

      - name: Install Terraform 
        uses: hashicorp/setup-terraform@v1

      - name: Terraform Init
        id: init
        run: cd terraform &&  terraform init
      
      - name: Terraform Validate
        id: validate
        run: cd terraform && terraform validate -no-color

      - name: Terraform Plan
        id: plan
        if: github.event_name == 'pull_request'
        run: cd terraform &&  terraform plan -no-color
        continue-on-error: true

      - uses: actions/github-script@0.9.0
        if: github.event_name == 'pull_request'
        env:
          PLAN: "terraform\n${{ steps.plan.outputs.stdout }}"
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const output = `#### Terraform Format and Style 🖌\`${{ steps.fmt.outcome }}\`
            #### Terraform Initialization ⚙️\`${{ steps.init.outcome }}\`
            #### Terraform Validation 🤖\`${{ steps.validate.outcome }}\`
            #### Terraform Plan 📖\`${{ steps.plan.outcome }}\`
            <details><summary>Show Plan</summary>
            \`\`\`\n
            ${process.env.PLAN}
            \`\`\`
            </details>
            *Pusher: @${{ github.actor }}, Action: \`${{ github.event_name }}\`*`;
            github.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: output
            })
      - name: Terraform Plan Status
        if: steps.plan.outcome == 'failure'
        run: exit

      - name: Terraform Apply
        env:
          access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID_R }}
          secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY_R }}
#        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: cd terraform && terraform state pull && terraform apply -auto-approve

#      - name: Configure Docker
#        run: ansibke playbook ansible/configure-docker.yml

      - name: Deploy
        uses: cancue/eks-action@v0.0.2
        env:
          aws_access_key_id: ${{ secrets.AWS_ACCESS_KEY_ID_R }}
          aws_secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY_R }}
          aws_region: ap-south-1 # we can edit 
          cluster_name: Microservice-K8S-Cluster # we can edit
        if: false == true # This makes job never execute 
        with:
          args: |
            kubectl apply -f  k8s/${{ env.MODULE_NAME }}.yml
      - name: Build Mail  
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{secrets.MAIL_USERNAME}}
          password: ${{secrets.MAIL_PASSWORD}}
          subject: Github Actions job result - APP UI
          to: ramakrishna.dev25@gmail.com
          from: rkmadire@gmail.com
          secure: true 
          body: Build job of ${{github.repository}} completed successfully!
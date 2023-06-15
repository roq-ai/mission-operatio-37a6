-- CreateTable
CREATE TABLE "customer_request" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "satellite_operator_id" UUID NOT NULL,
    "service" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operation_plan" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "satellite_operator_id" UUID NOT NULL,
    "mission_analyst_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operation_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "satellite_data" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "satellite_operator_id" UUID NOT NULL,
    "data" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "satellite_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "satellite_operator" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "image" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "satellite_operator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "customer_request" ADD CONSTRAINT "customer_request_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "customer_request" ADD CONSTRAINT "customer_request_satellite_operator_id_fkey" FOREIGN KEY ("satellite_operator_id") REFERENCES "satellite_operator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation_plan" ADD CONSTRAINT "operation_plan_mission_analyst_id_fkey" FOREIGN KEY ("mission_analyst_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "operation_plan" ADD CONSTRAINT "operation_plan_satellite_operator_id_fkey" FOREIGN KEY ("satellite_operator_id") REFERENCES "satellite_operator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "satellite_data" ADD CONSTRAINT "satellite_data_satellite_operator_id_fkey" FOREIGN KEY ("satellite_operator_id") REFERENCES "satellite_operator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "satellite_operator" ADD CONSTRAINT "satellite_operator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


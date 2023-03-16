package it.alexpaganucci.howgotem.validators;

import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StrongPasswordValidator.class)
public @interface StrongPassword {

    String message() default "richiede almeno una lettera maiuscola, una lettera minuscola, un numero e almeno 8 caratteri alfanumerici.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

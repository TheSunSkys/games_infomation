import 'package:equatable/equatable.dart';

class Laguage extends Equatable {
  const Laguage({
    required this.name,
    required this.code,
  });

  final String name;
  final String code;
  @override
  List<Object?> get props => [name, code];
}
